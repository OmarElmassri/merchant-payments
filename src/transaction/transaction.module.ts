import { MerchantSchema } from './../merchant/merchant.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionSchema } from './transaction.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Transaction", schema: TransactionSchema }, { name: "Merchant", schema: MerchantSchema }])],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService]
})
export class TransactionModule { }
