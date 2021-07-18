import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ContextProvider } from 'src/context/context.provider';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './auth.constant';
import { JwtPayload } from './auth.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  authService: AuthService;
  constructor(
    @Inject(UserService)
    private userService: UserService,
    @Inject(ContextProvider)
    private contextProvider: ContextProvider,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne({ id: payload.id });
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    this.contextProvider.setUser(user);
    return user;
  }
}
