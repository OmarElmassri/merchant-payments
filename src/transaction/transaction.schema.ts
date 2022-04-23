import { Merchant } from '../merchant/merchant.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop(String)
  code: string;

  @Prop(Number)
  amount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' })
  merchantId: Merchant;

  @Prop({ enum: ['USD', 'EGP', 'EUR'] })
  currency: string;

  @Prop({ enum: ['pay', 'refund'] })
  operation: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);