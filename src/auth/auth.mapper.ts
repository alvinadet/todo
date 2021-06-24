import { UserDto, UserUpdateDto } from 'src/user/user.inteface';

export class AuthMapper {
  static mapEntityToDto(e: Partial<UserDto>): UserDto {
    return {
      id: e.id,
      username: e.username,
      fullname: e.fullname,
    };
  }
  static mapDtoToEntity(e: Partial<UserUpdateDto>): UserDto {
    return {
      id: e.id,
      username: e.username,
      fullname: e.fullname,
      passwordHash: e.passwordHash,
      passwordSalt: e.passwordSalt,
    };
  }
}
