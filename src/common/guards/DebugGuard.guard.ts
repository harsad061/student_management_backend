import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';


@Injectable()
export class DebugGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    console.log('Authorization header:', req.headers.authorization);
    return true; // Let everything through for debugging
  }
}
