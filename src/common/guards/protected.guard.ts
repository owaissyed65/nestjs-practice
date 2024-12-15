import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class Protected extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    // Accessing headers via ExecutionContext
    const request = context.switchToHttp().getRequest();
    console.log('Request Headers:', request.headers['authorization']); // Log all headers
    console.log(err, user, 'protected');
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
