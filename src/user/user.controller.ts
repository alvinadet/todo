import { Controller, Get, Request } from '@nestjs/common';
import { UserDto } from './user.inteface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async get(@Request() req): Promise<UserDto[]> {
    return this.userService.find(req);
  }
}
