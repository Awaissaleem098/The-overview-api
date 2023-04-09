import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import { BearerToken, LogInDto } from './auth.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(logInDto: LogInDto): Promise<BearerToken> {
    const foundUser = await this.usersService.getOneByUsername(logInDto.username);
    if (!foundUser) {
      throw new NotFoundException();
    }
    const passwordMatch = await bcrypt.compare(logInDto.password, foundUser.password);

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }
    return await this.generateJwt(foundUser);
  }

  async generateJwt(user: User): Promise<BearerToken> {
    const payload = { username: user.username, email: user.email }; //TODO add sub with user uuid for later checking subject.
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
