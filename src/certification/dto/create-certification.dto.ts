import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateCertificationDto {
    @ApiProperty({ example: 'AWS Certified Solutions Architect' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Amazon Web Services' })
    @IsString()
    @IsNotEmpty()
    organization: string;

    @ApiProperty({ example: '2023-05' })
    @IsString()
    @IsNotEmpty()
    issueDate: string;

    @ApiPropertyOptional({ example: '2026-05' })
    @IsString()
    @IsOptional()
    expiryDate?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    credentialId?: string;

    @ApiPropertyOptional()
    @IsUrl()
    @IsOptional()
    credentialUrl?: string;
}

export class UpdateCertificationDto extends PartialType(CreateCertificationDto) { }
