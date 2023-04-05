import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    console.log(user.password);
    console.log(pass);
    console.log(await compare(user.password, pass));

    if (user && (await compare(pass, user?.password))) {
      const payload = { email: user.email, sub: user.id };
      const access_token = await this.jwtService.sign(payload);
      return access_token;
    }
    throw new UnauthorizedException();
  }
}
