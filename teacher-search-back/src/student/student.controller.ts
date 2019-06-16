import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';
import { SearchQuery } from '../common/interfaces/search-query.interface';

@Controller('student')
export class StudentController {

  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() studentDto: StudentDto) {
    this.studentService.create(studentDto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() studentDto: StudentDto) {
    this.studentService.update(id, studentDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    this.studentService.remove(id);
  }

  @Get()
  async find(@Query() query: SearchQuery) {
    const { search, limit, offset } = query;
    return await this.studentService.find(search, +limit, +offset);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }
}
