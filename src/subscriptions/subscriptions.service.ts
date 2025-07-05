import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembersService } from '../members/members.service';
import { SportsService } from '../sports/sports.service';
import { CreateSubscriptionDto } from './dto/create-subscriptions.dto';
import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>,
    // Inject other services to verify entities exist
    private readonly membersService: MembersService,
    private readonly sportsService: SportsService,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    // Verify that the member and sport actually exist before creating subscription
    await this.membersService.findOne(createSubscriptionDto.member_id);
    await this.sportsService.findOne(createSubscriptionDto.sport_id);

    const subscription = this.subscriptionsRepository.create(createSubscriptionDto);

    try {
      // This will attempt to save the subscription to the database.
      return await this.subscriptionsRepository.save(subscription);
    } catch (error) {
      // This handles the BONUS requirement for endpoint #9.
      // If the database throws a "unique_violation" error,
      // it means the (member_id, sport_id) pair already exists.
      if (error.code === '23505') {
        throw new ConflictException('This member is already subscribed to this sport.');
      }
      // If it's a different error, we let it bubble up.
      throw error;
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; id: number }> {
    // This is for endpoint #10: "Unsubscribe a member from a sport"
    // The simplest implementation is to delete the subscription record directly.
    const result = await this.subscriptionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subscription with ID #${id} not found`);
    }
    return { deleted: true, id };
  }
}