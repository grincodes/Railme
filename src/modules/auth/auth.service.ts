import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { SiginDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(signInDto: SiginDto): Promise<any> {
    const user = await this.usersService.findOne(signInDto.email);
    console.log(user);

    if (user && (await compare(signInDto.password, user?.password))) {
      const payload = { email: user.email, id: user.id, sub: user.id };
      // const access_token = await this.jwtService.sign(payload);
      // return access_token;
      return user;
    }
    throw new UnauthorizedException();
  }
}
