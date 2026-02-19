import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const res = context.switchToHttp().getResponse<Response>();

        const accessToken = req.cookies?.access_token;
        const refreshToken = req.cookies?.refresh_token;

        if (!accessToken) {
            return this.handleRefresh(refreshToken, req, res);
        }

        try {
            const payload = await this.jwtService.verifyAsync(accessToken, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            });

            const user = await this.userService.findById(payload.sub);
            if (!user) throw new UnauthorizedException('User not found');

            req['user'] = user;
            return true;
        } catch (err: any) {
            if (err.name === 'TokenExpiredError') {
                return this.handleRefresh(refreshToken, req, res);
            }
            throw new UnauthorizedException('Invalid access token');
        }
    }

    private async handleRefresh(
        refreshToken: string | undefined,
        req: Request,
        res: Response,
    ): Promise<boolean> {
        if (!refreshToken) throw new UnauthorizedException('Session expired, please login again');

        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            });

            const user = await this.userService.findById(payload.sub);
            if (!user) throw new UnauthorizedException('User not found');

            const newAccessToken = await this.jwtService.signAsync(
                {
                    sub: user._id,
                    email: user.email,
                    walletAddress: user.walletAddress,
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '15m',
                },
            );

            res.cookie('access_token', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000,
            });

            req['user'] = user;
            return true;
        } catch {
            throw new UnauthorizedException('Session expired, please login again');
        }
    }
}