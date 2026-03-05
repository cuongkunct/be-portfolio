import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { Blog, BlogDocument } from './schemas/blog.schema';
import slugify from 'slugify';

@Injectable()
export class BlogService {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) { }

    private generateSlug(title: string): string {
        return slugify(title, { lower: true, strict: true, locale: 'vi' });
    }

    async create(createBlogDto: CreateBlogDto): Promise<Blog> {
        const slug = this.generateSlug(createBlogDto.title);
        const createdBlog = new this.blogModel({ ...createBlogDto, slug });
        return createdBlog.save();
    }

    async findAll(): Promise<Blog[]> {
        return this.blogModel.find().sort({ date: -1 }).exec();
    }

    async findOne(id: string): Promise<Blog> {
        const blog = await this.blogModel.findById(id).exec();
        if (!blog) throw new NotFoundException(`Blog post #${id} not found`);
        return blog;
    }

    async findBySlug(slug: string): Promise<Blog> {
        const blog = await this.blogModel.findOne({ slug }).exec();
        if (!blog) throw new NotFoundException(`Blog post with slug ${slug} not found`);
        return blog;
    }

    async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
        let updateData = { ...updateBlogDto };
        if (updateBlogDto.title) {
            updateData['slug'] = this.generateSlug(updateBlogDto.title);
        }
        const existingBlog = await this.blogModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!existingBlog) throw new NotFoundException(`Blog post #${id} not found`);
        return existingBlog;
    }

    async remove(id: string): Promise<Blog> {
        const deletedBlog = await this.blogModel.findByIdAndDelete(id).exec();
        if (!deletedBlog) throw new NotFoundException(`Blog post #${id} not found`);
        return deletedBlog;
    }
}
