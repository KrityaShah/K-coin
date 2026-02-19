import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name : User.name, schema: userSchema}]),
    JwtModule.register({}),
    forwardRef(() => AuthModule),
  TransactionModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
