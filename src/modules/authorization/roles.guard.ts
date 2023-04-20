import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_TYPE } from 'src/core/constants/values';

import { ROLE_KEY } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<USER_TYPE>(ROLE_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return user.role == requiredRole;
  }
}

// inject reflector when you want to get savemetadat from decorator
