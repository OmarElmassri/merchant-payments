import { MerchantDto } from './merchant.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class MerchantsPaginationDto {
  @ApiProperty()
  @IsInt()
  count: number;

  @ApiProperty({ isArray: true, type: MerchantDto })
  data: MerchantDto[];
}