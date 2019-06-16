import { Schema } from 'mongoose';
import { USER_INFO_MODEL, USER_STATUS_MODEL } from '../../../constants/constants';

export const UserSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  info: {
    type: Schema.Types.ObjectId,
    ref: USER_INFO_MODEL,
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: USER_STATUS_MODEL,
  },
});
