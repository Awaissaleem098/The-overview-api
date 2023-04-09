import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from './user.model';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(createUser: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUser.password, 10);

    const user = new User(createUser.username, createUser.email, hashedPassword);

    await this.userRepository.createUser(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
