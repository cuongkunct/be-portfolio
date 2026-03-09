import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateBlogDto {
    @ApiProperty({ example: 'My First Blog' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: '# Hello World\nThis is my first post.' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ example: 'Technology' })
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    imageUrl?: string;

    @ApiPropertyOptional()
    @IsOptional()
    date?: Date;
}

export class UpdateBlogDto extends PartialType(CreateBlogDto) { }
