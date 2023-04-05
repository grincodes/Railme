import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from '../auth/auth.controller';
import { usersProviders } from './users.providers';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [UsersService, ...usersProviders, JwtService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
