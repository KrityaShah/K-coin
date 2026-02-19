import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports: [
        JwtModule.register({global: true}),
        forwardRef(() => UserModule),
    ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
