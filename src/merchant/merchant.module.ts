import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { MerchantSchema } from './merchant.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Merchant", schema: MerchantSchema }])],
  providers: [MerchantService],
  controllers: [MerchantController]
})
export class MerchantModule { }
