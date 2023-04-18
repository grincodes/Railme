import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthorizationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const userType = request.body.userType;

    return next.handle().pipe(
      tap(() => {
        const { user } = context.switchToHttp().getRequest();

        if (user.role != userType) {
          throw new UnauthorizedException('unauthorized user type');
        }
      }),
    );
  }
}
