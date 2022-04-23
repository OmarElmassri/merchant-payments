import { TransactionDto } from './../DTOs/transaction.dto';
import { TransactionsPaginationDto } from './../DTOs/transactions-pagination.dto';
import { TransactionDocument } from './transaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService {
  constructor(@InjectModel('Transaction') private merchantModel: Model<TransactionDocument>) { }

  // List Transactions
  async listTransactions(): Promise<TransactionsPaginationDto> {
    try {
      return {} as TransactionsPaginationDto;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // List Merchant transactions
  async listMerchantTransactions(merchantCode: string): Promise<TransactionsPaginationDto> {
    try {
      return {} as TransactionsPaginationDto;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Create Transaction
  async createTransaction(merchantCode: string, transactionObject: TransactionDto): Promise<TransactionDto> {
    try {
      return {} as TransactionDto;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Update Transaction
  async updateTransaction(transactionCode: string, transactionObject: Partial<TransactionDto>): Promise<TransactionDto> {
    try {
      return {} as TransactionDto;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Delete Transaction
  async deleteTransaction(transactionCode: string): Promise<TransactionDto> {
    try {
      return {} as TransactionDto;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
