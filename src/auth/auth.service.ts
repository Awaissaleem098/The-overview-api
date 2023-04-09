import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import { BearerToken } from './auth.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}



  async generateJwt(user: User): Promise<BearerToken> {
    const payload = { username: user.username, email: user.email }; //TODO add sub with user uuid for later checking subject.
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
