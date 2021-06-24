import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  LoginDto,
  LoginResultDto,
  RegisterDto,
  RegisterResultDto,
} from './auth.interface';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt.guard';

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
