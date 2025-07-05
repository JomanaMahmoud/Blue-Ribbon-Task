// src/sports/sports.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from './sport.entity'; 
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';

@Injectable()
export class SportsService {
  constructor(
    @InjectRepository(Sport)
    private readonly sportsRepository: Repository<Sport>,
  ) {}

  async create(createSportDto: CreateSportDto): Promise<Sport> {
    // With the DTO fixed, this line now works perfectly.
    const sport = this.sportsRepository.create(createSportDto);

    // FIX: You don't need to spread {...sport}. Just pass the entity object.
    return await this.sportsRepository.save(sport);
  }

  async findAll(): Promise<Sport[]> {
    return await this.sportsRepository.find();
  }

  async findOne(id: number): Promise<Sport> {
    const sport = await this.sportsRepository.findOneBy({ id });
    if (!sport) {
      throw new NotFoundException(`Sport with ID #${id} not found`);
    }
    return sport;
  }

  async update(id: number, updateSportDto: UpdateSportDto): Promise<Sport> {
    // With the DTO fixed, this preload call will now work perfectly.
    const sport = await this.sportsRepository.preload({
      id,
      ...updateSportDto,
    });
    if (!sport) {
      throw new NotFoundException(`Sport with ID #${id} not found`);
    }
    return await this.sportsRepository.save(sport);
  }

  async remove(id: number): Promise<{ deleted: boolean; id: number }> {
    const result = await this.sportsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sport with ID #${id} not found`);
    }
    return { deleted: true, id };
  }
}