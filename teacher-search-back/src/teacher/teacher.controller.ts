import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherDto } from './dto/teacher.dto';
import { SearchQuery } from '../common/interfaces/search-query.interface';

@Controller('teacher')
export class TeacherController {

  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  async create(@Body() teacherDto: TeacherDto) {
    this.teacherService.create(teacherDto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() teacherDto: TeacherDto) {
    this.teacherService.update(id, teacherDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    this.teacherService.remove(id);
  }

  @Get()
  async find(@Query() query: SearchQuery) {
    const { search, limit, offset } = query;
    return await this.teacherService.find(search, +limit, +offset);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }
}
