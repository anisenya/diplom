import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { STUDENT_MODEL } from '../constants/constants';
import { TeacherSchema } from './schemas/teacher.schema';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: STUDENT_MODEL, schema: TeacherSchema }]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
