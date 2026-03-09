import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CreateCertificationDto, UpdateCertificationDto } from './dto/create-certification.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Certification')
@Controller('certification')
export class CertificationController {
    constructor(private readonly certificationService: CertificationService) { }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create new certification' })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createCertificationDto: CreateCertificationDto) {
        return this.certificationService.create(createCertificationDto);
    }

    @ApiOperation({ summary: 'Get all certifications' })
    @Get()
    findAll() {
        return this.certificationService.findAll();
    }

    @ApiOperation({ summary: 'Get a single certification by ID' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.certificationService.findOne(id);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update certification by ID' })
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCertificationDto: UpdateCertificationDto) {
        return this.certificationService.update(id, updateCertificationDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete certification by ID' })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.certificationService.remove(id);
    }
}
