import { Subscription } from '../subscriptions/subscription.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
  })
  gender: GenderEnum;

  @Column({ type: 'date' }) // Stores as 'YYYY-MM-DD'
  birthdate: string;

  @Column()
  subscription_date: Date;

  // --- Relationships ---

  // The ID of the central member this member is linked to.
  @Column({ nullable: true })
  central_member_id: number;

  // The actual central member object (can be loaded).
  @ManyToOne(() => Member, (member) => member.family_members, { onDelete: 'SET NULL' })
  central_member: Member;

  // A list of family members for whom THIS member is the central member.
  @OneToMany(() => Member, (member) => member.central_member)
  family_members: Member[];

  // A list of all subscriptions this member has.
  @OneToMany(() => Subscription, (subscription) => subscription.member)
  subscriptions: Subscription[];
}