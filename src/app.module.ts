import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transaction/transaction.module';
import { MerchantModule } from './merchant/merchant.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from '@hapi/joi';
import 'dotenv/config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.ATLAS_URL),
    TransactionModule,
    MerchantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
