import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { sanitizeUser } from 'src/auth/utils/sanitize-user';
import { TransactionService } from 'src/transaction/transaction.service';

@Controller('user')
export class UserController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async health() {
    return 'Ok';
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    return {
      user: sanitizeUser(req['user']),
    };
  }

  @UseGuards(AuthGuard)
  @Get('wallet')
  async getWallet(@Req() req: Request) {
    const user = req['user'];
    const balance = await this.transactionService.getBalance(
      user.walletAddress,
    );
    return {
      walletAddress: user.walletAddress,
      balance,
    };
  }
}
