import { TransactionService } from './../transaction/transaction.service';
import { TransactionSchema } from './../transaction/transaction.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { MerchantSchema } from './merchant.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Merchant", schema: MerchantSchema }, { name: "Transaction", schema: TransactionSchema }])],
  providers: [MerchantService, TransactionService],
  controllers: [MerchantController]
})
export class MerchantModule { }
