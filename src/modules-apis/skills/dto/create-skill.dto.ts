import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateSkillDto {
    @ApiProperty({ description: 'The name of the skill', example: 'React' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Category of the skill', example: 'Frontend' })
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiPropertyOptional({ description: 'Optional image or icon URL for the skill' })
    @IsString()
    @IsOptional()
    image?: string;
}

export class UpdateSkillDto extends PartialType(CreateSkillDto) { }
