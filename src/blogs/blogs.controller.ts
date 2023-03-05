import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from './blogs.dto';
import { Blog } from './blogs.model';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  private async create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return await this.blogsService.create(createBlogDto);
  }

  @Get(':id')
  private async findOne(@Param('id') blogId: string): Promise<Blog> {
    return await this.blogsService.findOne(blogId);
  }

  @Get()
  private async findAll(): Promise<Blog[]> {
    return await this.blogsService.findAll();
  }

  @Patch(':id')
  private async update(
    @Param('id') blogId: string,
    @Body() updateBlog: UpdateBlogDto,
  ): Promise<boolean> {
    return await this.blogsService.update(blogId, updateBlog);
  }

  @Delete(':id')
  private async deleteOne(@Param('id') blogId: string): Promise<boolean> {
    return await this.blogsService.deleteOne(blogId);
  }

  @Delete()
  private deleteMany() {
    return this.blogsService.deleteMany();
  }
}
