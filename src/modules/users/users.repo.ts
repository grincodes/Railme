import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { User } from './interface/user.interface';

@Injectable()
export class UserRepo extends EntityRepository<User> {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }
}
