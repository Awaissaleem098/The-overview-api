import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('signup')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  private addUser(@Body() createUserDto: CreateUserDto): void {
    this.usersService.createUser(createUserDto).catch((e) => {
      console.log('SignUp: Add user failed.', e);
    });
  }
}
