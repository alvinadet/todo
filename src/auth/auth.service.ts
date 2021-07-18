import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDto, RegisterResultDto } from './auth.interface';
import { AuthMapper } from './auth.mapper';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ username: username });

    if (user.username) {
      const passwordHashIsValid = bcrypt.compareSync(
        password,
        user.passwordHash,
      );
      const passwordSaltIsValid = bcrypt.compareSync(
        password,
        user.passwordSalt,
      );

      if (passwordHashIsValid && passwordSaltIsValid) {
        return AuthMapper.mapEntityToDto(user);
      } else {
        return { message: "username or password isn't correct2!" };
      }
    } else {
      return { message: "username or password isn't correct2!" };
    }
  }

  async login(user: LoginDto) {
    const res = await this.validateUser(user.username, user.password);
    if (res?.username) {
      return {
        token: this.jwtService.sign({ id: res.id }),
      };
    } else {
      return { message: "username or password isn't correct!" };
    }
  }
  async register(user: Partial<RegisterDto>): Promise<RegisterResultDto> {
    const password = user.password;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(password, 8);
    const passwordSalt = bcrypt.hashSync(password, salt);
    try {
      const newData = {
        username: user.username,
        fullname: user.fullname,
        passwordHash: passwordHash,
        passwordSalt: passwordSalt,
      };
      const res = await this.userService.create(newData);
      if (res?.username) {
        return {
          data: res,
          message: 'Success Register User!',
        };
      } else {
        return {
          message: 'Error when register user!',
        };
      }
    } catch (err) {
      console.log(err.message);
      return {
        message: 'Error when register user!',
      };
    }
  }

  async validateToken(token: string) {
    console.log(token);
    const user = await this.jwtService.verify(token);
    console.log(user);
    return true;
  }
}
