// src/sports/entities/sport.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum AllowedGenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  MIX = 'mix',
}

@Entity('sports')
export class Sport {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  subscription_price: number;

  @Column({ type: 'enum', enum: AllowedGenderEnum })
  allowed_gender: AllowedGenderEnum;
}