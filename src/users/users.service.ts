import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from './user.model';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { BearerToken } from '../auth/auth.dto';

const SALT_OR_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(createUser: CreateUserDto): Promise<BearerToken> {
    const hashedPassword = await bcrypt.hash(createUser.password, SALT_OR_ROUNDS);

    const user = new User(createUser.username, createUser.email, hashedPassword);
    await this.userRepository.createUser(user);

    return this.authService.generateJwt(user);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneByUsername(username);
  }
}
