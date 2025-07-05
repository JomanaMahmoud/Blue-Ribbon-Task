import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum AllowedGenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  MIX = 'mix',
}

@Entity('sports') // Matches CREATE TABLE sports
export class Sport {
  @PrimaryGeneratedColumn() // Matches id SERIAL PRIMARY KEY
  id: number;

  @Column({ unique: true }) // Matches name VARCHAR(255) NOT NULL UNIQUE
  name: string;

  @Column({
    name: 'subscription_price', // But it maps to the `subscription_price` column in the DB
    type: 'numeric',           // Matches the NUMERIC(10, 2) data type
    precision: 10,
    scale: 2,
  })
  subscriptionPrice: number;


  @Column({
    name: 'allowed_gender',    // But it maps to the `allowed_gender` column in the DB
    type: 'enum',
    enum: AllowedGenderEnum,   
  })
  allowedGender: AllowedGenderEnum;
}