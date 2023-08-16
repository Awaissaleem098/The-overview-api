import { Module } from '@nestjs/common';
import { BlogsModule } from './blogs/blogs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TutorialsModule } from './tutorials/tutorials.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/theoverview`),
    BlogsModule,
    TutorialsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
