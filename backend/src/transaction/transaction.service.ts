import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schema/transaction.schema';
import { Model } from 'mongoose';
import { TransactionStatus } from 'src/common/enums/transaction-status.enum';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async getBalance(walletAddress: string): Promise<number> {
    const transactions = await this.transactionModel
      .find({
        status: TransactionStatus.CONFIRMED,
        $or: [{ sender: walletAddress }, { recipient: walletAddress }],
      })
      .exec();

    return transactions.reduce((balance, tx) => {
      if (tx.recipient === walletAddress) return balance + tx.amount;
      if (tx.sender === walletAddress) return balance - tx.amount;
      return balance;
    }, 0);
  }

  async create(
    createTransactionDto: CreateTransactionDto,
    senderWallet: string,
  ): Promise<TransactionDocument> {
    const balance = await this.getBalance(senderWallet);

    if (balance < createTransactionDto.amount) {
      throw new BadRequestException('Insufficient funds');
    }

    const transaction = new this.transactionModel({
      sender: senderWallet,
      recipient: createTransactionDto.recipient,
      amount: createTransactionDto.amount,
      status: TransactionStatus.PENDING,
    });

    return transaction.save();
  }

  async createCoinbase(
    minerWallet: string,
    amount: number,
    sender: string,
  ): Promise<TransactionDocument> {
    const coinbase = new this.transactionModel({
      sender,
      recipient: minerWallet,
      amount,
      status: TransactionStatus.PENDING,
    });
    return coinbase.save();
  }

  async getPending(): Promise<TransactionDocument[]> {
    return this.transactionModel
      .find({ status: TransactionStatus.PENDING })
      .exec();
  }

  async confirmTransactions(transactionIds: string[]): Promise<void> {
    await this.transactionModel.updateMany(
      { _id: { $in: transactionIds } },
      { status: TransactionStatus.CONFIRMED },
    );
  }
}
