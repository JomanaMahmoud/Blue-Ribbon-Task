// src/sports/entities/sport.entity.ts

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// This TypeScript enum provides type safety within your application code.
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

  // This property is named `subscriptionPrice` (camelCase) in your code
  @Column({
    name: 'subscription_price', // But it maps to the `subscription_price` column in the DB
    type: 'numeric',           // Matches the NUMERIC(10, 2) data type
    precision: 10,
    scale: 2,
  })
  subscriptionPrice: number;

  // This property is named `allowedGender` (camelCase) in your code
  @Column({
    name: 'allowed_gender',    // But it maps to the `allowed_gender` column in the DB
    type: 'enum',
    enum: AllowedGenderEnum,   // Links to your TypeScript enum for type safety
  })
  allowedGender: AllowedGenderEnum;
}