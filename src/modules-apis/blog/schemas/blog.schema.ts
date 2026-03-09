import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true })
export class Blog {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true, unique: true })
    slug: string;

    @Prop({ required: true })
    content: string; // Markdown content

    @Prop({ required: true })
    category: string;

    @Prop({ required: false })
    imageUrl?: string;

    @Prop({ default: Date.now })
    date: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
