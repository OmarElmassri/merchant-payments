import { TransactionDto } from './transaction.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class TransactionsPaginationDto {
  @ApiProperty()
  @IsInt()
  count: number;

  @ApiProperty({ isArray: true, type: TransactionDto })
  data: TransactionDto[];
}