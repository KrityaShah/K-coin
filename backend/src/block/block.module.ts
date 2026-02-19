import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Block, blockSchema } from './schema/block.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Block.name, schema: blockSchema }]),
        forwardRef(() => AuthModule),
        forwardRef(() => UserModule),
        TransactionModule,
    ],
    controllers: [BlockController],
    providers: [BlockService],
})
export class BlockModule {}