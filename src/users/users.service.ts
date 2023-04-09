import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from './user.model';
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(createUser: CreateUserDto) {
    // hash password
    const user = new User(createUser.username, createUser.email, createUser.password);
    await this.userRepository.createUser(user);
  }
}
