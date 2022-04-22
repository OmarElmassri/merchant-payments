import { MerchantDocument } from './merchant.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MerchantService {
  constructor(@InjectModel('Merchant') private merchantModel: Model<MerchantDocument>) { }
}
