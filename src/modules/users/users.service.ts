import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { CreateUserDto } from '../auth/dto/auth.request.dto';
import { hash } from 'bcrypt';
import { UserRepo } from './users.repo';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepo) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await hash(createUserDto.password, 10);

    return this.userRepo.create({
      id: uuid(),
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ email });
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find({});
  }

  async setCurrentRefreshToken(refreshToken: string, id: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepo.findOneAndUpdate(
      { id },
      {
        currentHashedRefreshToken,
      },
    );
  }

  async removeRefreshToken(id: string) {
    return this.userRepo.findOneAndUpdate(
      { id },
      {
        currentHashedRefreshToken: null,
      },
    );
  }

  async getById(id: string) {
    const user = await this.userRepo.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: string) {
    const user = await this.getById(id);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
}
