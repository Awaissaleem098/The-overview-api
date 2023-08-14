import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TutorialPreviewDto {
  publicId: string;
  title: string;
  logo: string;
  description: string;
  duration: string;
  authorEmail: string;
}

export class CreateTutorialDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsString()
  @IsNotEmpty()
  duration: string;
  @IsString()
  @IsNotEmpty()
  logo: string;
  @IsEmail()
  authorEmail: string;
}

export class UpdateTutorialDto {
  @IsString()
  @IsNotEmpty()
  publicId: string;
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
  duration?: string;
  @IsString()
  @IsOptional()
  logo?: string;
}

export class FeedbackDto {
  @IsString()
  @IsNotEmpty()
  username?: string;
  @IsString()
  @IsOptional()
  message?: string;
}
