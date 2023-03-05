import { ArrayNotEmpty, IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  content: string;

  @IsString()
  image: string;

  @IsDate()
  date: Date;

  @ArrayNotEmpty()
  @Type(() => FeedBackDto)
  @IsOptional()
  feedbacks?: FeedBackDto[];
}

export class UpdateBlogDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsDate()
  @IsOptional()
  date?: Date;

  @ArrayNotEmpty()
  @Type(() => FeedBackDto)
  @IsOptional()
  feedbacks?: FeedBackDto[];
}

class FeedBackDto {
  name: string;
  message: string;
}
