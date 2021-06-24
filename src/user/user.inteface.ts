export interface UserDto {
  id: string;
  username: string;
  fullname: string;
  passwordHash?: string;
  passwordSalt?: string;
}

export interface UserUpdateDto extends UserDto {}

export interface UserCreateDto extends Omit<UserUpdateDto, 'id' | ''> {}
