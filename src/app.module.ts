import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TutorialsModule } from './tutorials/tutorialsModule';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/theoverview'), BlogsModule, TutorialsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
