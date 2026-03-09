import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: false })
    imageUrl?: string;

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ required: false })
    githubLink?: string;

    @Prop({ required: false })
    demoLink?: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
