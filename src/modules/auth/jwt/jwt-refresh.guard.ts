import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  handleRequest(err, user, info, context) {
    const req = context.switchToHttp().getRequest();
    req.user = user; // set the authenticated user on the request object
    return super.handleRequest(err, user, info, context);
  }
}
