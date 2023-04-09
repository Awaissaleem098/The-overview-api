import { IsNotEmpty, IsString } from 'class-validator';

export interface BearerToken {
  access_token: string;
}

export class LogInDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
