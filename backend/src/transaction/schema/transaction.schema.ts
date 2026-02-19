import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TransactionStatus } from 'src/common/enums/transaction-status.enum';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  recipient: string;

  @Prop({ required: true })
  amount: number;

  @Prop({
    default: TransactionStatus.PENDING,
    enum: Object.values(TransactionStatus),
  })
  status: TransactionStatus;
}

export const transactionSchema = SchemaFactory.createForClass(Transaction);
