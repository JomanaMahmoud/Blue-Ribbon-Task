import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GenderEnum } from '../member.entity';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsDateString() // Validates 'YYYY-MM-DD' format
  birthdate: string;

  @IsDateString()
  subscription_date: string;

  @IsInt()
  @IsOptional() // A member does not have to be linked to a family
  central_member_id?: number;
}