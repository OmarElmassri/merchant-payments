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
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: `Merchant email is required` })
  @IsEmail()
  email: string;
}