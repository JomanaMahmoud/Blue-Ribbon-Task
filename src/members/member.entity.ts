// src/members/entities/member.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// IMPORTANT: You must import the Subscription entity to reference it.
import { Subscription } from '../subscriptions/subscription.entity';

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ type: 'enum', enum: GenderEnum })
  gender: GenderEnum;

  @Column({ type: 'date' })
  birthdate: string;

  @Column({ name: 'subscription_date', type: 'timestamptz' })
  subscriptionDate: Date;

  // --- Relationships ---

  @ManyToOne(() => Member, (member) => member.familyMembers, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'central_member_id' })
  centralMember: Member | null;

  @OneToMany(() => Member, (member) => member.centralMember)
  familyMembers: Member[];

  // THIS IS THE FIX. Add this property.
  // It defines the "one" side of the "one-to-many" relationship with Subscription.
  @OneToMany(() => Subscription, (subscription) => subscription.member)
  subscriptions: Subscription[];
}