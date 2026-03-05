import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create new blog post' })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createBlogDto: CreateBlogDto) {
        return this.blogService.create(createBlogDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Upload blog cover image and return URL' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        const result = await this.cloudinaryService.uploadImage(file);
        return { imageUrl: result.secure_url };
    }

    @ApiOperation({ summary: 'Get all blog posts' })
    @Get()
    findAll() {
        return this.blogService.findAll();
    }

    @ApiOperation({ summary: 'Get a single blog post by slug' })
    @Get('slug/:slug')
    findBySlug(@Param('slug') slug: string) {
        return this.blogService.findBySlug(slug);
    }

    @ApiOperation({ summary: 'Get a single blog post by ID' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.blogService.findOne(id);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update blog post by ID' })
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
        return this.blogService.update(id, updateBlogDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete blog post by ID' })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.blogService.remove(id);
    }
}
