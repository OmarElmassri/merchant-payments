import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum, IsOptional, IsString } from "class-validator";
import { Currency, Operation } from "./enums.dto";

export class TransactionDto {
  _id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty()
  @IsNotEmpty({ message: `Amount is required` })
  amount: number;

  @ApiProperty()
  @IsOptional()
  merchantId?: string;

  @ApiProperty({ enum: () => Currency })
  @IsNotEmpty({ message: `Currency is required` })
  @IsEnum(Currency)
  currency: Currency;

  @ApiProperty({ enum: () => Operation })
  @IsNotEmpty({ message: `Operation type is required` })
  @IsEnum(Operation)
  operation: Operation;
}