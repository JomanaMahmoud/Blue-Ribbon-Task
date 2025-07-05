import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { SubscriptionTypeEnum } from '../subscription.entity';

export class CreateSubscriptionDto {
  @IsInt()
  @IsNotEmpty()
  member_id: number;

  @IsInt()
  @IsNotEmpty()
  sport_id: number;

  @IsEnum(SubscriptionTypeEnum)
  @IsNotEmpty()
  type: SubscriptionTypeEnum;
}