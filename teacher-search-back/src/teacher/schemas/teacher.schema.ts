import { Schema } from 'mongoose';
import { TIMESTAMPS } from '../../constants/constants';

export const TeacherSchema = new Schema(
  {
    name: String,
    department: String,
    status: Boolean,
    cabinetNumber: Number,
  },
  TIMESTAMPS,
);
