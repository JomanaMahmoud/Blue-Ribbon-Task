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

  create(createSportDto: CreateSportDto): Promise<Sport> {
    const sport = this.sportsRepository.create(createSportDto);
    return this.sportsRepository.save(sport);
  }

  findAll(): Promise<Sport[]> {
    return this.sportsRepository.find();
  }

  async findOne(id: number): Promise<Sport> {
    const sport = await this.sportsRepository.findOneBy({ id });
    if (!sport) {
      throw new NotFoundException(`Sport with ID #${id} not found`);
    }
    return sport;
  }

  async update(id: number, updateSportDto: UpdateSportDto): Promise<Sport> {
    const sport = await this.sportsRepository.preload({ id, ...updateSportDto });
    if (!sport) {
      throw new NotFoundException(`Sport with ID #${id} not found`);
    }
    return this.sportsRepository.save(sport);
  }

  async remove(id: number): Promise<{ deleted: boolean; id: number }> {
    const result = await this.sportsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sport with ID #${id} not found`);
    }
    return { deleted: true, id };
  }
}