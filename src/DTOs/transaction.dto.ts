import { MerchantDto } from './merchant.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum, IsOptional, IsString, Min } from "class-validator";
import { Currency, Operation } from "./enums.dto";

export class TransactionDto {
  _id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty()
  @IsNotEmpty({ message: `Amount is required` })
  @Min(1)
  amount: number;

  @ApiProperty()
  @IsOptional()
  merchantId?: string;

  @ApiProperty({ type: () => MerchantDto })
  @IsOptional()
  merchant?: MerchantDto;

  @ApiProperty({
    enum: Currency,
    isArray: true,
    example: Currency.EGP,
  })
  @IsNotEmpty({ message: `Currency is required` })
  @IsEnum(Currency, { message: "Currency must be EGP, USD or EUR" })
  currency: Currency;

  @ApiProperty({
    enum: Operation,
    isArray: true,
    example: Operation.pay,
  })
  @IsNotEmpty({ message: `Operation type is required` })
  @IsEnum(Operation, { message: "Operation must be pay or refund" })
  operation: Operation;

  @ApiProperty()
  @IsOptional()
  created_at?: Date;
}