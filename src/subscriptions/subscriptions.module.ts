// src/subscriptions/subscriptions.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { Subscription } from './subscription.entity';
import { MembersModule } from '../members/members.module'; // <-- IMPORT MembersModule
import { SportsModule } from '../sports/sports.module';   // <-- IMPORT SportsModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    MembersModule, // <-- ADD THIS MODULE HERE
    SportsModule,  // <-- AND THIS MODULE HERE
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}