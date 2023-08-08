import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

export const SECRET_KEY = 'secret'; // TODO remove it in source code and keep it in env file.
const EXPIRY_TIME = '10h'; //FIXME Expiry in 5 minutes.

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: {
        expiresIn: EXPIRY_TIME,
      },
    }),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
