import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

import { AllowedGenderEnum } from '../sport.entity';

export class CreateSportDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  subscriptionPrice: number;

  @IsEnum(AllowedGenderEnum) // Use the enum here for validation
  @IsNotEmpty()
  allowedGender: AllowedGenderEnum; // And use the enum here for the type
}