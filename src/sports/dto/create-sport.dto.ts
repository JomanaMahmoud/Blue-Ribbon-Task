// src/sports/dto/create-sport.dto.ts

import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
// IMPORTANT: Import the enum from your entity file
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