import { Schema } from 'mongoose';
import { TIMESTAMPS } from '../../constants/constants';

export const StudentSchema = new Schema(
  {
    name: String,
    group: String,
  },
  TIMESTAMPS,
);
