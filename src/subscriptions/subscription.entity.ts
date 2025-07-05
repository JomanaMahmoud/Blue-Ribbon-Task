import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Member } from '../members/member.entity';
import { Sport } from '../sports/sport.entity';

// Enum for the subscription type, as per your schema
export enum SubscriptionTypeEnum {
  GROUP = 'group',
  PRIVATE = 'private',
}

@Entity('subscriptions')
// BONUS: This decorator creates a UNIQUE constraint on the combination of these two columns.
// This efficiently ensures a member cannot have more than one subscription to the same sport.
@Unique(['member', 'sport'])
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: SubscriptionTypeEnum,
    name: 'type', // Explicitly matches the 'type' column from your SQL
  })
  type: SubscriptionTypeEnum;

  // --- Relationships ---

  // Relation to the Member entity
  @ManyToOne(() => Member, (member) => member.subscriptions, {
    onDelete: 'CASCADE', // If a member is deleted, their subscriptions are also deleted.
    nullable: false,     // A subscription must belong to a member.
  })
  @JoinColumn({ name: 'member_id' }) // This is CRITICAL. It links this relation to the 'member_id' FK column.
  member: Member;

  // Relation to the Sport entity
  @ManyToOne(() => Sport, { // This is a one-way relation, as Sport doesn't need to know its subscriptions.
    onDelete: 'CASCADE', // If a sport is deleted, its subscriptions are also deleted.
    nullable: false,     // A subscription must be for a sport.
  })
  @JoinColumn({ name: 'sport_id' }) // This links this relation to the 'sport_id' FK column.
  sport: Sport;
}