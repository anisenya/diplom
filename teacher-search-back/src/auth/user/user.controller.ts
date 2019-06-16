import { Body, Controller, Post, UseGuards, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserInfo } from './interfaces/user.interface';
import { UserService } from './services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { IsAdmin } from 'src/guards/isAdmin.guard';
import { UserDecorator } from './decorators/user.decorator';
import { SearchByNameQuery, SearchByParametersQuery } from './interfaces/search-query.interface';
import { IsStudent } from '../../guards/isStudent.guard';
import { IsTeacher } from '../../guards/isTeacher.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('teachers/count')
  @UseGuards(AuthGuard('jwt'), IsStudent)
  async getTeachersCount() {
    return this.userService.getTeachersCount();
  }

  @Get('teachers/query')
  @UseGuards(AuthGuard('jwt'), IsStudent)
  async findTeachersInfoByName(@Query() query: SearchByNameQuery) {
    const { search, faculty, department, limit, offset } = query;
    return this.userService.findTeachersInfoByName(search, department, faculty, +limit, +offset);
  }

  @Get('teachers/parameters')
  @UseGuards(AuthGuard('jwt'), IsStudent, IsAdmin)
  async findTeachersInfoByParameters(@Query() query: SearchByParametersQuery) {
    const { department, faculty } = query;
    return this.userService.findTeachersInfoByParameters(department, faculty);
  }
  @Get()
  @UseGuards(AuthGuard('jwt'), IsAdmin)
  async getAll(): Promise<UserInfo[]> {
    return await this.userService.findAllInfo();
  }

  @Get('refresh')
  @UseGuards(AuthGuard('jwt'))
  async updateCurrentUserData(@UserDecorator() user: any): Promise<UserInfo> {
    return await this.userService.findUserInfoById(user._id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), IsAdmin)
  async getUserById(@Param('id') id: string): Promise<UserInfo> {
    return await this.userService.findUserInfoById(id);
  }

  @Post()
  // @UseGuards(AuthGuard('jwt'), IsAdmin)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Put('data')
  @UseGuards(AuthGuard('jwt'), IsTeacher)
  async updateUserData(@UserDecorator() user: any, @Body() data: any): Promise<User> {
    return await this.userService.findByIdAndUpdateUserData(user._id, data);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'), IsTeacher)
  async updateUser(@UserDecorator() user: any, @Body() data: any): Promise<UserInfo> {
    return await this.userService.findByIdAndUpdate(user._id, data);
  }

  @Delete(':login')
  // @UseGuards(AuthGuard('jwt'), IsAdmin)
  async deleteUser(@Param('login') login: string): Promise<any> {
    return await this.userService.deleteUser(login);
  }
}
