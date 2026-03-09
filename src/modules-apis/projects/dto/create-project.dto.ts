import { IsString, IsNotEmpty, IsOptional, IsUrl, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateProjectDto {
    @ApiProperty({ example: 'Portfolio Website' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'A professional portfolio built with NestJS and Next.js' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    imageUrl?: string;

    @ApiPropertyOptional({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @ApiPropertyOptional()
    @IsUrl()
    @IsOptional()
    githubLink?: string;

    @ApiPropertyOptional()
    @IsUrl()
    @IsOptional()
    demoLink?: string;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) { }
