import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports: [
        ConfigModule,
        JwtModule.register({}),
        UserModule,
    ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
