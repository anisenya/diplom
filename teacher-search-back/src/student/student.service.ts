import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './interfaces/student.interface';
import { STUDENT_MODEL } from '../constants/constants';
import { StudentDto } from './dto/student.dto';

@Injectable()
export class StudentService {

  constructor(@InjectModel(STUDENT_MODEL) private readonly teacherModel: Model<Student>) {}

  async create(student: StudentDto): Promise<Student> {
    const createdTeacher = new this.teacherModel(student);
    return await createdTeacher.save();
  }

  async update(id: string, student: StudentDto): Promise<Student> {
    return await this.teacherModel
      .findOneAndUpdate({ _id: id }, student)
      .exec();
  }

  async remove(id: string): Promise<Student> {
    return await this.teacherModel.findByIdAndRemove(id);
  }

  async findOne(id: string): Promise<Student> {
    return await this.teacherModel.findById(id).exec();
  }

  async find(
    name: string = '',
    limit: number = 5,
    offset: number = 0,
  ): Promise<Student[]> {
    return await this.teacherModel
      .find({ name: { $regex: `^${name}`, $options: 'i' }})
      .skip(limit * offset)
      .limit(limit)
      .exec();
  }
}
