import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { STUDENT_MODEL } from '../constants/constants';
import { StudentSchema } from './schemas/student.schema';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: STUDENT_MODEL, schema: StudentSchema }]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
