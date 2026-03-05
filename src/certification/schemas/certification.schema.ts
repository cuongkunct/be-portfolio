import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CertificationDocument = Certification & Document;

@Schema({ timestamps: true })
export class Certification {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    organization: string;

    @Prop({ required: true })
    issueDate: string;

    @Prop({ required: false })
    expiryDate?: string;

    @Prop({ required: false })
    credentialId?: string;

    @Prop({ required: false })
    credentialUrl?: string;
}

export const CertificationSchema = SchemaFactory.createForClass(Certification);
