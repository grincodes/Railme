import { Request } from 'express';
import { User } from '../users/interface/user.interface';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
