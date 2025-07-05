import { Member } from '../members/member.entity';
import { Sport } from '../sports/sport.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum SubscriptionTypeEnum {
  GROUP = 'group',
  PRIVATE = 'private',
}

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  member_id: number;

  @Column()
  sport_id: number;

  @Column({
    type: 'enum',
    enum: SubscriptionTypeEnum,
  })
  type: SubscriptionTypeEnum;

  @ManyToOne(() => Member, (member) => member.subscriptions, { onDelete: 'CASCADE' })
  member: Member;

  @ManyToOne(() => Sport, { onDelete: 'CASCADE' })
  sport: Sport;
}