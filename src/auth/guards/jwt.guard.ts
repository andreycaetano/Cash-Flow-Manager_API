import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info: Error) {
    if (err || !user) {
      let message = 'Unauthorized access: invalid or expired token.';

      if (info instanceof Error) {
        if (info.name === 'TokenExpiredError') {
          message = 'Token has expired, please log in again.';
        } else if (info.name === 'JsonWebTokenError') {
          message = 'Invalid token, please provide a valid token.';
        } else if (info.name === 'NotBeforeError') {
          message = 'Token is not yet active. Please check the token timing configuration.';
        }
      }

      throw new UnauthorizedException(message);
    }
    return user;
  }
}
