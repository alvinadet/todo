import { Body, Controller, Post, UseGuards, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  LoginDto,
  LoginResultDto,
  RegisterDto,
  RegisterResultDto,
} from './auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() data: LoginDto): Promise<LoginResultDto> {
    return this.authService.login(data);
  }
  @UseGuards(AuthGuard('local'))
  @Post('register')
  async register(@Body() data: RegisterDto): Promise<RegisterResultDto> {
    return this.authService.register(data);
  }
}
