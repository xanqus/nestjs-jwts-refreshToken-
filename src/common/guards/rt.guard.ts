import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export class RtGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('RtGuard');
    return super.canActivate(context);
  }
}
