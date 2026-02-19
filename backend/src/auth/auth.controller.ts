import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() registerDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.register(registerDto, res);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.login(loginDto, res);
    }

    @Post('refresh')
    refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        return this.authService.refresh(req, res);
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        return this.authService.logout(res);
    }
}