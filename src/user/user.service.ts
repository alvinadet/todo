import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserCreateDto, UserDto } from './user.inteface';
import { UserMapper } from './user.mapper';

const { PORT } = process.env;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  get(): string {
    console.log(PORT);
    return 'Hello ini user get service';
  }
  async create(data: UserCreateDto): Promise<UserDto> {
    const createdData = this.userRepository.create(
      UserMapper.mapDtoToEntity(data),
    );

    const res = await this.userRepository.save(createdData);

    return UserMapper.mapEntityToDto(res);
  }
  async findOne(parameter: Partial<UserDto>): Promise<UserDto> {
    let findUser = {};
    if (parameter.username) {
      findUser = { ...findUser, username: parameter.username };
    }
    if (parameter.id) {
      findUser = { ...findUser, id: parameter.id };
    }
    if (parameter.fullname) {
      findUser = { ...findUser, fullname: parameter.fullname };
    }
    const res = await this.userRepository.findOne(findUser);
    return UserMapper.mapDtoToEntity(res);
  }
  async find(parameter?: Partial<UserDto>): Promise<UserDto[]> {
    let findUser = {};
    if (parameter.username) {
      findUser = { ...findUser, username: parameter.username };
    }
    if (parameter.id) {
      findUser = { ...findUser, id: parameter.id };
    }
    if (parameter.fullname) {
      findUser = { ...findUser, fullname: parameter.fullname };
    }
    const res = await this.userRepository.find(findUser);
    return res.map((e) => UserMapper.mapEntityToDto(e));
  }
}
