import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlockDocument = Block & Document;

@Schema({ timestamps: true })
export class Block {
  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  previousHash: string;

  @Prop({ required: true })
  hash: string;

  @Prop({ required: true })
  nonce: number;

  @Prop({ type: Array, default: [] })
  transactions: any[];
}

export const blockSchema = SchemaFactory.createForClass(Block);
