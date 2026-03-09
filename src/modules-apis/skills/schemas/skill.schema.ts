import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SkillDocument = Skill & Document;

@Schema({ timestamps: true })
export class Skill {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    category: string; // e.g., 'Frontend', 'Backend', 'Tools'

    @Prop({ required: false })
    image?: string; // Optional icon or image URL
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
