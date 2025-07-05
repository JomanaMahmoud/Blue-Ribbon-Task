import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { SubscriptionTypeEnum } from '../subscription.entity'; // Corrected path

export class CreateSubscriptionDto {
  @IsInt()
  @IsNotEmpty()
  memberId: number; 

  @IsInt()
  @IsNotEmpty()
  sportId: number; 

  @IsEnum(SubscriptionTypeEnum)
  @IsNotEmpty()
  type: SubscriptionTypeEnum;
}