import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEducationDto, UpdateEducationDto } from './dto/create-education.dto';
import { Education, EducationDocument } from './schemas/education.schema';

@Injectable()
export class EducationService {
    constructor(@InjectModel(Education.name) private educationModel: Model<EducationDocument>) { }

    async create(createEducationDto: CreateEducationDto): Promise<Education> {
        const createdEducation = new this.educationModel(createEducationDto);
        return createdEducation.save();
    }

    async findAll(): Promise<Education[]> {
        return this.educationModel.find().exec();
    }

    async findOne(id: string): Promise<Education> {
        const education = await this.educationModel.findById(id).exec();
        if (!education) throw new NotFoundException(`Education #${id} not found`);
        return education;
    }

    async update(id: string, updateEducationDto: UpdateEducationDto): Promise<Education> {
        const existingEducation = await this.educationModel.findByIdAndUpdate(id, updateEducationDto, { new: true }).exec();
        if (!existingEducation) throw new NotFoundException(`Education #${id} not found`);
        return existingEducation;
    }

    async remove(id: string): Promise<Education> {
        const deletedEducation = await this.educationModel.findByIdAndDelete(id).exec();
        if (!deletedEducation) throw new NotFoundException(`Education #${id} not found`);
        return deletedEducation;
    }
}
