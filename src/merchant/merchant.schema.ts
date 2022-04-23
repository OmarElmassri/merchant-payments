import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MerchantDocument = Merchant & Document;

@Schema()
export class Merchant {
  @Prop(String)
  code: string;

  @Prop(String)
  name: string;

  @Prop()
  email: string
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);