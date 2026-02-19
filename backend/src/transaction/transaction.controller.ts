import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
    const user = req['user'];
    return this.transactionService.create(
      createTransactionDto,
      user.walletAddress,
    );
  }

  @UseGuards(AuthGuard)
  @Get('pending')
  getPending() {
    return this.transactionService.getPending();
  }
}
