import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto, UpdateSkillDto } from './dto/create-skill.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
    constructor(private readonly skillsService: SkillsService) { }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new skill' })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createSkillDto: CreateSkillDto) {
        return this.skillsService.create(createSkillDto);
    }

    @ApiOperation({ summary: 'Get all skills' })
    @Get()
    findAll() {
        return this.skillsService.findAll();
    }

    @ApiOperation({ summary: 'Get a single skill by ID' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.skillsService.findOne(id);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a skill by ID' })
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
        return this.skillsService.update(id, updateSkillDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a skill by ID' })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.skillsService.remove(id);
    }
}
