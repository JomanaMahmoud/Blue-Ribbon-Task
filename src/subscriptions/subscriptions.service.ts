// src/subscriptions/subscriptions.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscriptions.dto';
import { MembersService } from '../members/members.service'; // We need this to find members
import { SportsService } from '../sports/sports.service';   // We need this to find sports

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    // Inject the other services so we can use them
    private readonly membersService: MembersService,
    private readonly sportsService: SportsService,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    const { memberId, sportId, type } = createSubscriptionDto;

    // 1. Find the actual member and sport entities.
    // If either doesn't exist, the findOne method will throw a NotFoundException,
    // which is exactly what we want.
    const member = await this.membersService.findOne(memberId);
    const sport = await this.sportsService.findOne(sportId);

    // 2. Create a new subscription entity instance.
    const newSubscription = this.subscriptionRepository.create({
      type,
      member, // Assign the full member object
      sport,  // Assign the full sport object
    });

    // 3. Save the new subscription. TypeORM will handle setting the foreign keys.
    // If the subscription already exists, the @Unique constraint in the entity will cause a DB error.
    try {
      return await this.subscriptionRepository.save(newSubscription);
    } catch (error) {
      // Catch potential unique constraint violation error from the database
      if (error.code === '23505') { // 23505 is the PostgreSQL code for unique_violation
        throw new NotFoundException('This member is already subscribed to this sport.');
      }
      throw error; // Re-throw any other errors
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; id: number }> {
    const result = await this.subscriptionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subscription with ID #${id} not found`);
    }
    return { deleted: true, id };
  }
}