import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Block, BlockDocument } from './schema/block.schema';
import { TransactionService } from 'src/transaction/transaction.service';
import * as crypto from 'crypto';

@Injectable()
export class BlockService {
  constructor(
    @InjectModel(Block.name) private blockModel: Model<BlockDocument>,
    private readonly transactionService: TransactionService,
  ) {}

  async getChain(): Promise<BlockDocument[]> {
    return this.blockModel.find().sort({ index: 1 }).exec();
  }

  async mine(minerWallet: string) {
    const pendingTransactions = await this.transactionService.getPending();

    const coinbaseTx = await this.transactionService.createCoinbase(
      minerWallet,
      Number(process.env.COINBASE_AMOUNT),
      process.env.COINBASE_SENDER!,
    );

    const allIds = [
      coinbaseTx._id.toString(),
      ...pendingTransactions.map((tx) => tx._id.toString()),
    ];
    await this.transactionService.confirmTransactions(allIds);

    const transactions = [
      { ...coinbaseTx.toObject(), status: 'confirmed' },
      ...pendingTransactions.map((tx) => ({
        ...tx.toObject(),
        status: 'confirmed',
      })),
    ];

    const lastBlock = await this.getLastBlock();
    const previousHash = lastBlock ? lastBlock.hash : '0';
    const index = lastBlock ? lastBlock.index + 1 : 1;

    const { nonce, hash } = this.proofOfWork(index, previousHash, transactions);

    const newBlock = new this.blockModel({
      index,
      previousHash,
      hash,
      nonce,
      transactions,
    });

    await newBlock.save();

    return newBlock;
  }

  private computeHash(
    index: number,
    previousHash: string,
    nonce: number,
    transactions: any[],
  ): string {
    const data = JSON.stringify({ index, previousHash, nonce, transactions });
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  private proofOfWork(
    index: number,
    previousHash: string,
    transactions: any[],
  ): { nonce: number; hash: string } {
    let nonce = 0;
    let hash = '';
    const difficulty = process.env.MINING_DIFFICULTY!;

    while (!hash.startsWith(difficulty)) {
      nonce++;
      hash = this.computeHash(index, previousHash, nonce, transactions);
    }

    return { nonce, hash };
  }

  private async getLastBlock(): Promise<BlockDocument | null> {
    return this.blockModel.findOne().sort({ index: -1 }).exec();
  }
}
