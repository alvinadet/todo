import { Module, Scope } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './auth.constant';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    {
      provide: 'JWT_AUTH_GUARD',
      useClass: JwtAuthGuard,
      scope: Scope.REQUEST,
      inject: [UserService],
    },
    LocalStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService, 'JWT_AUTH_GUARD', JwtStrategy],
})
export class AuthModule {}
