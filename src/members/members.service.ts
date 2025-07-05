import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,
  ) {}

  create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.membersRepository.create(createMemberDto);
    return this.membersRepository.save(member);
  }

  findAll(): Promise<Member[]> {
    return this.membersRepository.find();
  }

  async findOne(id: number): Promise<Member> {
    // This is for endpoint #6: "Get a member's details"
    // We load all relevant relations to provide full details.
    const member = await this.membersRepository.findOne({
      where: { id },
      relations: ['subscriptions', 'subscriptions.sport', 'family_members', 'central_member'],
    });

    if (!member) {
      throw new NotFoundException(`Member with ID #${id} not found`);
    }
    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    // Preload finds the member and merges the new data onto it.
    const member = await this.membersRepository.preload({
      id,
      ...updateMemberDto,
    });
    if (!member) {
      throw new NotFoundException(`Member with ID #${id} not found`);
    }
    return this.membersRepository.save(member);
  }

  async remove(id: number): Promise<{ deleted: boolean; id: number }> {
    const result = await this.membersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Member with ID #${id} not found`);
    }
    return { deleted: true, id };
  }
}