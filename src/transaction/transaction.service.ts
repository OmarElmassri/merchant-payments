import { TransactionDocument } from './transaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService {
  constructor(@InjectModel('Transaction') private merchantModel: Model<TransactionDocument>) { }
}
