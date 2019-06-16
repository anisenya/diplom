import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TEACHER_MODEL } from '../constants/constants';
import { Teacher } from './interfaces/teacher.interface';
import { Model } from 'mongoose';
import { TeacherDto } from './dto/teacher.dto';

@Injectable()
export class TeacherService {

  constructor(@InjectModel(TEACHER_MODEL) private readonly teacherModel: Model<Teacher>) {}

  async create(teacher: TeacherDto): Promise<Teacher> {
    const createdTeacher = new this.teacherModel(teacher);
    return await createdTeacher.save();
  }

  async update(id: string, teaher: TeacherDto): Promise<Teacher> {
    return await this.teacherModel
      .findOneAndUpdate({ _id: id }, teaher)
      .exec();
  }

  async remove(id: string): Promise<Teacher> {
    return await this.teacherModel.findByIdAndRemove(id);
  }

  async findOne(id: string): Promise<Teacher> {
    return await this.teacherModel.findById(id).exec();
  }

  async find(
    name: string = '',
    department: string,
    limit: number = 5,
    offset: number = 0,
  ): Promise<Teacher[]> {
    return await this.teacherModel
      .find({ name: { $regex: `^${name}`, $options: 'i' }, department: {department} })
      .skip(limit * offset)
      .limit(limit)
      .exec();
  }
}
