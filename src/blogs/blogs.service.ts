import { Injectable, Logger } from '@nestjs/common';
import { CreateBlogDto, UpdateBlogDto } from './blogs.dto';
import { BlogsRepository } from './blogs.repository';

@Injectable()
export class BlogsService {
  private logger = new Logger(BlogsService.name);

  constructor(private repository: BlogsRepository) {}

  public async create(createBlogDto: CreateBlogDto) {
    try {
      return await this.repository.create(createBlogDto);
    } catch (e) {
      this.logger.error('Failed to create a blog', e);
    }
  }

  public async findOne(blogId: string) {
    try {
      return await this.repository.findOne(blogId);
    } catch (e) {
      this.logger.error('Failed to find a blog', e);
      throw e;
    }
  }

  public async findAll() {
    try {
      return await this.repository.findAll();
    } catch (e) {
      this.logger.error('Failed to find all blogs', e);
      throw e;
    }
  }

  public async update(blogId: string, updateBlogDto: UpdateBlogDto) {
    try {
      return await this.repository.update(blogId, updateBlogDto);
    } catch (e) {
      this.logger.error('Failed to update a blog', e);
      throw e;
    }
  }

  public async deleteOne(blogId: string) {
    try {
      return await this.repository.deleteOne(blogId);
    } catch (e) {
      this.logger.error('Failed to delete a blog', e);
      throw e;
    }
  }

  public async deleteMany() {
    try {
      return await this.repository.deleteMany();
    } catch (e) {
      this.logger.error('Failed to delete blogs', e);
      throw e;
    }
  }
}
