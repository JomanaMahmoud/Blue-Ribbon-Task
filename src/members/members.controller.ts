import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post() // 5. Create a member
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get() // Optional: A way to see all members
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id') // 6. Get a member's details
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.membersService.findOne(id);
  }

  @Patch(':id') // 7. Update a member
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(id, updateMemberDto);
  }

  @Delete(':id') // 8. Delete a member
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.membersService.remove(id);
  }
}