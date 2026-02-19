import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { sanitizeUser } from './utils/sanitize-user';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async register(registerDto: CreateUserDto, res: Response) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const walletAddress = this.generateWalletAddress();

        const saved = await this.userService.create({
            ...registerDto,
            password: hashedPassword,
            walletAddress,
        });

        const { accessToken, refreshToken } = await this.generateTokens(
            saved._id.toString(),
            saved.email,
            saved.walletAddress,
        );

        this.setCookies(res, accessToken, refreshToken);

        return {
            message: 'Registered successfully',
            user: sanitizeUser(saved),
        };
    }


    async login(loginDto: LoginDto, res: Response) {
        const user = await this.userService.findByEmail(loginDto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        const { accessToken, refreshToken } = await this.generateTokens(
            user._id.toString(),
            user.email,
            user.walletAddress,
        );

        this.setCookies(res, accessToken, refreshToken);

        return {
            message: 'Logged in successfully',
            user: sanitizeUser(user),
        };
    }


    async refresh(req: Request, res: Response) {
        const token = req.cookies?.refresh_token;
        if (!token) throw new UnauthorizedException('Refresh token missing');

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            });

            const { accessToken, refreshToken } = await this.generateTokens(
                payload.sub,
                payload.email,
                payload.walletAddress,
            );

            this.setCookies(res, accessToken, refreshToken);
            return { message: 'Tokens refreshed successfully' };
        } catch {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }


    async logout(res: Response) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return { message: 'Logged out successfully' };
    }


     private generateWalletAddress(): string {
        return '0x' + crypto.randomBytes(20).toString('hex');
    }

    private async generateTokens(userId: string, email: string, walletAddress: string) {
        const payload = { sub: userId, email, walletAddress };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }),
        ]);

        return { accessToken, refreshToken };
    }

    private setCookies(res: Response, accessToken: string, refreshToken: string) {
        const isProd = process.env.NODE_ENV === 'production';

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }

}