import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret', // TODO remove it in source code and keep it in env file.
      signOptions: {
        expiresIn: '300s', // Expiry in 5 minutes.
      },
    }),
    forwardRef(() => UsersModule)
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}