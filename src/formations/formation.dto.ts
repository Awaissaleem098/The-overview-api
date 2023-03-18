import { IsNotEmpty, IsString } from 'class-validator';

export class FormationPreviewDto {
  publicId: string;
  title: string;
  logo: string;
  description: string;
  duration: string;
}

export class FormationContentOutPutDto {
  content: string;
}

export class CreateFormationDto {
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
}
