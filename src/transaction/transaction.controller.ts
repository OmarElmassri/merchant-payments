import { TransactionDto } from './../DTOs/transaction.dto';
import { MerchantDto } from './../DTOs/merchant.dto';
import { TransactionsPaginationDto } from './../DTOs/transactions-pagination.dto';
import { ApiResponse, ApiParam, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { Controller, Get, Param, Post, Body, Query, Patch, Delete } from '@nestjs/common';

@ApiTags('Transaction APIs')
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) { }

  // List Transactions
  @ApiResponse({ status: 200, type: TransactionsPaginationDto })
  @Get('')
  async listTransactions(): Promise<TransactionsPaginationDto> {
    return await this.transactionService.listTransactions();
  }

  // List Merchant transactions
  @ApiParam({ name: 'merchant_code', required: true, example: 'MR_34086302' })
  @ApiResponse({ status: 200, type: TransactionsPaginationDto })
  @Get(':merchant_code')
  async listMerchantTransactions(@Param('merchant_code') merchantCode: MerchantDto['code']): Promise<TransactionsPaginationDto> {
    return await this.transactionService.listMerchantTransactions(merchantCode);
  }

  // Create Transaction
  @ApiResponse({ status: 200, type: TransactionDto })
  @ApiQuery({ name: 'merchant_code', required: true, example: 'MR_34086302' })
  @ApiBody({ type: TransactionDto })
  @Post('')
  async createTransaction(
    @Query('merchant_code') merchantCode: MerchantDto['code'],
    @Body('') transactionObject: TransactionDto,
  ): Promise<TransactionDto> {
    return await this.transactionService.createTransaction(merchantCode, transactionObject);
  }

  // Update Transaction
  @ApiResponse({ status: 200, type: TransactionDto })
  @ApiParam({ name: 'code', required: true, example: 'TR_34086302' })
  @ApiBody({ type: TransactionDto })
  @Patch(':code')
  async updateTransaction(
    @Param('code') transactionCode: TransactionDto['code'],
    @Body('') transactionObject: Partial<TransactionDto>): Promise<TransactionDto> {
    return await this.transactionService.updateTransaction(transactionCode, transactionObject);
  }

  // Delete Transaction
  @ApiResponse({ status: 200, type: TransactionDto })
  @ApiParam({ name: 'code', required: true, example: 'TR_34086302' })
  @Delete(':code')
  async deleteTransaction(@Param('code') transactionCode: TransactionDto['code']): Promise<TransactionDto> {
    return await this.transactionService.deleteTransaction(transactionCode);
  }
}
