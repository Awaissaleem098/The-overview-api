import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { create } from 'domain';
import { CreateBlogDto } from './blogs.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {}

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }
}
