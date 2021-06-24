import { UserEntity } from './user.entity';
import { UserDto, UserUpdateDto } from './user.inteface';

export class UserMapper {
  static mapEntityToDto(e: UserEntity): UserDto {
    return {
      id: e.id,
      username: e.username,
      fullname: e.fullname,
    };
  }
  static mapDtoToEntity(e: Partial<UserUpdateDto>): UserEntity {
    return {
      id: e?.id,
      username: e?.username,
      fullname: e?.fullname,
      passwordHash: e?.passwordHash,
      passwordSalt: e?.passwordSalt,
    };
  }
}
