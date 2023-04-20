import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateAdminDto, CreateUserDto } from './dto/auth.request.dto';
import { UsersService } from '../users/users.service';
import { SiginDto } from './dto/sign-in.dto';
import { LocalAuthGuard } from './local/local-auth.guard';
import JwtRefreshGuard from './jwt/jwt-refresh.guard';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { JwtCookieService } from '../jwt-cookie-access-token/jwt-cookie.service';
import { USER_TYPE } from 'src/core/constants/values';
import { Roles } from '../authorization/roles.decorator';
import { RoleGuard } from '../authorization/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtCookieService: JwtCookieService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Body() signIn: SiginDto, @Req() req) {
    const { user } = req;

    const accessTokenCookie = this.jwtCookieService.getCookieWithJwtAccessToken(
      user.id,
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.jwtCookieService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    req.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('/create')
  async create(@Body() body: CreateUserDto) {
    try {
      const data = await this.usersService.create(body);
      console.log('data>>>>>', data);
      return data;
    } catch (error) {
      return error;
    }
  }

  @Post('/create-admin')
  async createAdmin(@Body() body: CreateAdminDto) {
    try {
      const data = await this.usersService.create(body);
      console.log('data>>>>>', data);
      return data;
    } catch (error) {
      return error;
    }
  }

  @Get('/users')
  async getUsers() {
    const data = await this.usersService.findAll();
    return data;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user._id);
    request.res.setHeader(
      'Set-Cookie',
      this.jwtCookieService.getCookiesForLogOut(),
    );
  }

  @UseGuards(JwtRefreshGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.jwtCookieService.getCookieWithJwtAccessToken(
      request.user._id,
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
