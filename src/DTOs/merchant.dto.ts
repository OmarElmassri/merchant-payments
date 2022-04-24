import { TransactionDto } from './transaction.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";

export class MerchantDto {
  _id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty()
  @IsNotEmpty({ message: `Merchant name is required` })
  @IsString({ message: `Merchant name is not valid` })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: `Merchant email is required` })
  @IsEmail({}, { message: `Merchant email is not valid` })
  email: string;

  @ApiProperty({ type: () => [TransactionDto] })
  @IsOptional()
  transactions?: TransactionDto[];
}