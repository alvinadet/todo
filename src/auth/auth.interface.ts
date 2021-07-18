export interface AuthDto {
  id: string;
  username: string;
  fullname: string;
  passwordHash?: string;
  passwordSalt?: string;
}

export interface LoginDto
  extends Omit<AuthDto, 'id' | 'fullname' | 'passwordHash' | 'passwordSalt'> {
  password: string;
}
export interface RegisterDto
  extends Omit<AuthDto, 'id' | 'passwordHash' | 'passwordSalt'> {
  password: string;
}

export interface LoginResultDto {
  token?: string;
  message?: string;
}

export interface RegisterResultDto {
  data?: AuthDto;
  message?: string;
}

export interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}
