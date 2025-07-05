import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { MembersModule } from '../members/members.module';
import { SportsModule } from '../sports/sports.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    MembersModule, // Import so we can use MembersService
    SportsModule, // Import so we can use SportsService
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}