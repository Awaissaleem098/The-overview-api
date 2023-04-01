import { IsNotEmpty, IsString } from 'class-validator';

export class TutorialPreviewDto {
  publicId: string;
  title: string;
  logo: string;
  description: string;
  duration: string;
}

export class TutorialContentOutPutDto {
  content: string;
}

export class CreateTutorialDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  previewDescription: string;
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsString()
  @IsNotEmpty()
  duration: string;
  @IsString()
  @IsNotEmpty()
  logo: string;

}
