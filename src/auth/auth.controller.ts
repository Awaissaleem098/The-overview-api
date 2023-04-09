import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BearerToken, LogInDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  private async logIn(@Body() logInDto: LogInDto): Promise<BearerToken> {
    return await this.authService.login(logInDto);
  }
}
