import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blogs.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBlogDto, UpdateBlogDto } from './blogs.dto';

export class BlogsRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  public async create(createBlog: CreateBlogDto): Promise<Blog> {
    return await this.blogModel.create(createBlog);
  }

  public async findOne(blogId: string): Promise<Blog> {
    return await this.blogModel
      .findOne({ _id: blogId })
      .setOptions({ strict: false })
      .exec();
  }

  public async findAll(): Promise<Blog[]> {
    return await this.blogModel.find().setOptions({ strict: false }).exec();
  }

  public async update(
    blogId: string,
    updateBlogDto: UpdateBlogDto,
  ): Promise<boolean> {
    const updateResult = await this.blogModel
      .updateOne({ _id: blogId }, { ...updateBlogDto, date: new Date() })
      .exec();
    return !!(updateResult && updateResult.modifiedCount > 0);
  }

  public async deleteOne(blogId: string): Promise<boolean> {
    const deleteResult = await this.blogModel.deleteOne({ _id: blogId });
    return !!(deleteResult && deleteResult.deletedCount > 0);
  }

  public async deleteMany(): Promise<boolean> {
    const deleteResult = await this.blogModel.deleteMany();
    return !!(deleteResult && deleteResult.deletedCount > 1);
  }
}
