import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const { centralMemberId, ...memberData } = createMemberDto;
    
    const member = this.membersRepository.create(memberData);

    if (centralMemberId) {
      const centralMember = await this.findOne(centralMemberId); // This validates the central member exists
      member.centralMember = centralMember;
    }

    return this.membersRepository.save(member);
  }

  async findAll(): Promise<Member[]> {
    return this.membersRepository.find({ relations: { centralMember: true } });
  }

  async findOne(id: number): Promise<Member> {
    // The task requires getting a member's details, which implies fetching relations.
    const member = await this.membersRepository.findOne({
      where: { id },
      relations: {
        centralMember: true,
        familyMembers: true,
      },
    });

    if (!member) {
      throw new NotFoundException(`Member with ID #${id} not found`);
    }
    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const { centralMemberId, ...memberData } = updateMemberDto;
    
    // Preload finds the entity and merges the new data into it.
    const member = await this.membersRepository.preload({
      id: id,
      ...memberData,
    });

    if (!member) {
      throw new NotFoundException(`Member with ID #${id} not found`);
    }
    
    // This logic allows changing or un-linking a central member.
    if (updateMemberDto.hasOwnProperty('centralMemberId')) {
        member.centralMember = centralMemberId ? await this.findOne(centralMemberId) : null;
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