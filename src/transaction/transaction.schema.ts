import { Currency, Operation } from './../DTOs/enums.dto';
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
  merchantId: string;

  @Prop({ enum: ['USD', 'EGP', 'EUR'] })
  currency: Currency;

  @Prop({ enum: ['pay', 'refund'] })
  operation: Operation;

  @Prop({ type: Date, default: Date.now() })
  created_at: Date
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);