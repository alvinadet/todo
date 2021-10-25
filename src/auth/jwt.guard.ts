import { Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Inject('AuthService')
    private authService: AuthService,
  ) {
    super();
  }

  // canActivate(context: ExecutionContext) {
  //   const request = context.switchToHttp().getRequest<Request>();

  //   // Read token
  //   const authorization = request.headers['authorization']?.replace(
  //     'Bearer ',
  //     '',
  //   );
  //   if (!authorization) {
  //     return false;
  //   }

  //   return super.canActivate(context);
  // }
}
