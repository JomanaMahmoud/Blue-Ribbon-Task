import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from 'class-validator';
import { AllowedGenderEnum } from '../sport.entity';

export class CreateSportDto {
  @IsString() @IsNotEmpty() @MinLength(3)
  name: string;

  @IsNumber() @IsPositive()
  subscription_price: number;

  @IsEnum(AllowedGenderEnum) @IsNotEmpty()
  allowed_gender: AllowedGenderEnum;
}