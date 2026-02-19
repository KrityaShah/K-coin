import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';
import { BlockService } from './block.service';

@Controller('block')
export class BlockController {

    constructor(private readonly blockchainService: BlockService) {}

    @Get('chain')
    getChain() {
        return this.blockchainService.getChain();
    }

    @UseGuards(AuthGuard)
    @Post('mine')
    mine(@Req() req: Request) {
        const user = req['user'];
        return this.blockchainService.mine(user.walletAddress);
    }
}