// src/subscriptions/dto/create-subscription.dto.ts
// (Note: Your controller has the filename as create-subscriptions.dto.ts, fix if needed)

import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { SubscriptionTypeEnum } from '../subscription.entity'; // Corrected path

export class CreateSubscriptionDto {
  @IsInt()
  @IsNotEmpty()
  memberId: number; // <-- CHANGED from member_id

  @IsInt()
  @IsNotEmpty()
  sportId: number; // <-- CHANGED from sport_id

  @IsEnum(SubscriptionTypeEnum)
  @IsNotEmpty()
  type: SubscriptionTypeEnum;
}