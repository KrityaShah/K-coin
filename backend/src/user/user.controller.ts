import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {



    @Get()
    async health(){
        return "Ok"
    }

    @UseGuards(AuthGuard)
    @Get('wallet')
    getWallet(@Req() req: Request) {
        const user = req['user'];
        return {
            walletAddress: user.walletAddress,
            balance: 0,
        };
    }
}
