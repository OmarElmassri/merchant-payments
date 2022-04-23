import { TransactionService } from './transaction.service';
import { Controller } from '@nestjs/common';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) { }
}
