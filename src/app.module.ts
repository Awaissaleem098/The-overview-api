import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FormationsModule } from './formations/formations.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/theoverview'), BlogsModule, FormationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
