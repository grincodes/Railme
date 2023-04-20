import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local/local.strategy';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtRefreshTokenStrategy } from './jwt/jwt-refresh-token.strategy';
import { JwtCookieModule } from '../jwt-cookie-access-token/jwt-cookie.module';

@Module({
  imports: [AuthModule, UsersModule, JwtCookieModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
