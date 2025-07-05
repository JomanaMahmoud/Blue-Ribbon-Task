// src/members/dto/create-member.dto.ts

import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { GenderEnum } from '../member.entity';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(GenderEnum, { message: 'Gender must be either male or female' })
  @IsNotEmpty()
  gender: GenderEnum;

  @IsDateString({}, { message: 'Birthdate must be a valid date string (e.g., YYYY-MM-DD)' })
  @IsNotEmpty()
  birthdate: string;

  @IsDateString({}, { message: 'Subscription date must be a valid ISO 8601 date string' })
  @IsNotEmpty()
  subscriptionDate: string;

  // To link a new member to an existing central member upon creation
  @IsNumber()
  @IsOptional()
  centralMemberId?: number;
}