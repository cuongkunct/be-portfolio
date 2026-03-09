import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateEducationDto {
    @ApiProperty({ example: 'Harvard University' })
    @IsString()
    @IsNotEmpty()
    institution: string;

    @ApiProperty({ example: 'Bachelor of Science' })
    @IsString()
    @IsNotEmpty()
    degree: string;

    @ApiProperty({ example: 'Computer Science' })
    @IsString()
    @IsNotEmpty()
    fieldOfStudy: string;

    @ApiProperty({ example: '2019' })
    @IsString()
    @IsNotEmpty()
    startDate: string;

    @ApiPropertyOptional({ example: '2023' })
    @IsString()
    @IsOptional()
    endDate?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateEducationDto extends PartialType(CreateEducationDto) { }
