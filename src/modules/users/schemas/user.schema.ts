import * as mongoose from 'mongoose';
import { USER_TYPE } from 'src/core/constants/values';

export const UserSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
  currentHashedRefreshToken: String,
  role: { type: String, enum: USER_TYPE, default: USER_TYPE.USER },
});
