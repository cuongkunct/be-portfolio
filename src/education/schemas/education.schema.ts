import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EducationDocument = Education & Document;

@Schema({ timestamps: true })
export class Education {
    @Prop({ required: true })
    institution: string;

    @Prop({ required: true })
    degree: string;

    @Prop({ required: true })
    fieldOfStudy: string;

    @Prop({ required: true })
    startDate: string; // ISO string or simple year string

    @Prop({ required: false })
    endDate?: string;

    @Prop({ required: false })
    description?: string;
}

export const EducationSchema = SchemaFactory.createForClass(Education);
