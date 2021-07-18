import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { UserDto } from '../user/user.inteface';

@Injectable()
export class ContextProvider {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  user: Partial<UserEntity>;
  currentUserId?: string;
  currentUserUsername?: string;

  setUser(user?: UserDto) {
    this.user = user;
    this.currentUserId = user.id;
    this.currentUserUsername = user.username;
  }
}
