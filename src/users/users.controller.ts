import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UsersService } from './users.service';
import { User } from './user.model';
import { BearerToken } from '../auth/auth.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  private addUser(@Body() createUserDto: CreateUserDto): Promise<BearerToken | void> {
    return this.usersService.create(createUserDto).catch((e) => {
      console.log('SignUp: Add user failed.', e);
    });
  }

  @Get()
  private async getUsers(): Promise<User[]> {
    return await this.usersService.getAll();
  }
}
