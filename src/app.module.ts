import { Module } from '@nestjs/common';
import { BlogsModule } from './blogs/blogs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TutorialsModule } from './tutorials/tutorials.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/theoverview'), BlogsModule, TutorialsModule, UsersModule, AuthModule],
})
export class AppModule {}
