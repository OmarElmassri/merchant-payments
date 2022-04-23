import { MerchantDto } from './../DTOs/merchant.dto';
import { MerchantsPaginationDto } from './../DTOs/merchants-pagination.dto';
import { MerchantDocument } from './merchant.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MerchantService {
  constructor(@InjectModel('Merchant') private merchantModel: Model<MerchantDocument>) { }

  // List Merchants
  async listMerchants(keyword: string): Promise<MerchantsPaginationDto> {
    try {
      return {} as MerchantsPaginationDto;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get Merchant
  async getMerchant(merchantCode: string): Promise<MerchantDto> {
    try {
      return {} as MerchantDto;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Create Merchant
  async createMerchant(merchantObject: MerchantDto): Promise<MerchantDto> {
    try {
      return {} as MerchantDto;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Update Merchant
  async updateMerchant(merchantCode: string, merchantObject: Partial<MerchantDto>): Promise<MerchantDto> {
    try {
      return {} as MerchantDto;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Delete Merchant
  async deleteMerchant(merchantCode: string): Promise<MerchantDto> {
    try {
      return {} as MerchantDto;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
