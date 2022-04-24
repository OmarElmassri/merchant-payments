import { MerchantDto } from './../DTOs/merchant.dto';
import { MerchantsPaginationDto } from './../DTOs/merchants-pagination.dto';
import { MerchantService } from './merchant.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Merchant APIs')
@Controller('merchant')
export class MerchantController {
  constructor(private merchantService: MerchantService) { }

  // List Merchants
  @ApiQuery({ name: 'keyword', required: false, example: 'El-Abd' })
  @ApiResponse({ status: 200, type: MerchantsPaginationDto })
  @Get('')
  async listMerchants(
    @Query('keyword') keyword = ''
  ): Promise<MerchantsPaginationDto> {
    return await this.merchantService.listMerchants(keyword);
  }

  // Get Merchant
  @ApiParam({ name: 'code', required: true, example: 'MR_80328042' })
  @ApiResponse({ status: 200, type: MerchantDto })
  @Get(':code')
  async getMerchant(@Param('code') merchantCode: MerchantDto['code']): Promise<MerchantDto> {
    return await this.merchantService.getMerchant(merchantCode);
  }

  // Create Merchant
  @ApiResponse({ status: 200, type: MerchantDto })
  @ApiBody({ type: MerchantDto })
  @Post('')
  async createMerchant(
    @Body('') merchantObject: MerchantDto
  ): Promise<MerchantDto> {
    return await this.merchantService.createMerchant(merchantObject);
  }

  // Update Comppany
  @ApiResponse({ status: 200, type: MerchantDto })
  @ApiParam({ name: 'code', required: true, example: 'MR_80328042' })
  @ApiBody({ type: MerchantDto })
  @Patch(':code')
  async updateMerchant(
    @Param('code') merchantCode: MerchantDto['code'],
    @Body('') merchantObject: Partial<MerchantDto>): Promise<MerchantDto> {
    return await this.merchantService.updateMerchant(merchantCode, merchantObject);
  }

  // Delete Merchant
  @ApiResponse({ status: 200, type: MerchantDto })
  @ApiParam({ name: 'code', required: true, example: 'MR_80328042' })
  @Delete(':code')
  async deleteMerchant(@Param('code') merchantCode: MerchantDto['code']): Promise<MerchantDto> {
    return await this.merchantService.deleteMerchant(merchantCode);
  }
}
