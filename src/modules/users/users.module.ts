import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from '../auth/auth.controller';
import { usersProviders } from './users.providers';
import { AuthService } from '../auth/auth.service';
import { UserRepo } from './users.repo';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [UsersService, ...usersProviders, UserRepo],
  exports: [UsersService],
})
export class UsersModule {}
