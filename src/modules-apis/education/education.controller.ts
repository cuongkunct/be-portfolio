import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto, UpdateEducationDto } from './dto/create-education.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Education')
@Controller('education')
export class EducationController {
    constructor(private readonly educationService: EducationService) { }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create new education entry' })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createEducationDto: CreateEducationDto) {
        return this.educationService.create(createEducationDto);
    }

    @ApiOperation({ summary: 'Get all education entries' })
    @Get()
    findAll() {
        return this.educationService.findAll();
    }

    @ApiOperation({ summary: 'Get a single education entry by ID' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.educationService.findOne(id);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update education entry by ID' })
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEducationDto: UpdateEducationDto) {
        return this.educationService.update(id, updateEducationDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete education entry by ID' })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.educationService.remove(id);
    }
}
