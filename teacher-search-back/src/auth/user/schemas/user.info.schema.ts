import { Schema } from 'mongoose';

export const UserInfoSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  avatarUrl: String,
  firstName: String,
  secondName: String,
  lastName: String,
  faculty: String,
  department: String,
  status: String,
  housingNumber: Number,
  cabinetNumber: Number,
});
