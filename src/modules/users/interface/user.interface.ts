import { Document } from 'mongoose';
import { USER_TYPE } from 'src/core/constants/values';

export interface User extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phoneNumber: string;
  password: string;
  readonly currentHashedRefreshToken: string;
  role: USER_TYPE;
}
