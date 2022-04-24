import { generateCode } from 'src/utils/helperFunctions';
import { MerchantDocument } from './../merchant/merchant.schema';
import { MerchantDto } from './../DTOs/merchant.dto';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { TransactionDto } from './../DTOs/transaction.dto';
import { TransactionsPaginationDto } from './../DTOs/transactions-pagination.dto';
import { TransactionDocument } from './transaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService {
  constructor(@InjectModel('Transaction') private transactionModel: Model<TransactionDocument>, @InjectModel('Merchant') private merchantModel: Model<MerchantDocument>) { }

  // List Transactions
  async listTransactions(): Promise<TransactionsPaginationDto> {
    try {
      // Transactions
      const transactions: TransactionDto[] = await this.transactionModel.find();

      return {
        count: transactions.length,
        data: transactions
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // List Merchant transactions
  async listMerchantTransactions(merchantCode: string): Promise<MerchantDto> {
    try {
      // Get merchant
      const merchant: MerchantDto = await this.merchantModel.findOne({ code: merchantCode });

      // Get merchant transactions
      merchant.transactions = await this.transactionModel.find({ merchantId: merchant._id });

      return merchant;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Create Transaction
  async createTransaction(merchantCode: string, transactionObject: TransactionDto): Promise<TransactionDto> {
    try {
      // Get linked merchant
      const merchant: MerchantDto = await this.merchantModel.findOne({ code: merchantCode });

      if (!merchant) throw new HttpException('Merchant does not exist', HttpStatus.NOT_FOUND);

      // Validate transaction
      transactionObject = await this.validateTransactionModel(transactionObject, false);

      // Destruct transaction data
      const { amount, currency, operation } = transactionObject;

      // Create transaction instance
      const transactionInstance: TransactionDocument = new this.transactionModel({ code: generateCode('TR'), amount, currency, operation, merchantId: merchant._id });

      // Created transaction
      return await transactionInstance.save();
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Update Transaction
  async updateTransaction(transactionCode: string, transactionObject: Partial<TransactionDto>): Promise<TransactionDto> {
    try {
      // Validate transaction
      transactionObject = await this.validateTransactionModel(transactionObject, true);

      // Destruct transaction data
      const { amount, currency, operation } = transactionObject;

      // Update transaction
      return await this.transactionModel.findOneAndUpdate({ code: transactionCode }, { amount, currency, operation, created_at: Date.now() }, { new: true });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Delete Transaction
  async deleteTransaction(transactionCode: string): Promise<TransactionDto> {
    try {
      return await this.transactionModel.findOneAndDelete({ code: transactionCode });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Validate transaction model
  async validateTransactionModel(transactionObject: TransactionDto | Partial<TransactionDto>, skipMissingProperties: boolean): Promise<TransactionDto> {
    // Convert object to dto class
    transactionObject = plainToClass(TransactionDto, transactionObject);

    // Validate company
    await validateOrReject(transactionObject, {
      skipMissingProperties
    });

    return transactionObject as TransactionDto;
  }
}
