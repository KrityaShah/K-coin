import { forwardRef, Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, transactionSchema } from './schema/transaction.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: transactionSchema },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
