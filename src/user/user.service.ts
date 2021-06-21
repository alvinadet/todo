import { Injectable } from '@nestjs/common';

const { PORT } = process.env;

@Injectable()
export class UserService {
  get(): string {
    console.log(PORT);
    return 'Hello ini user get service';
  }
}
