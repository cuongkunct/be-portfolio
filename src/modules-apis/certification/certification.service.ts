import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCertificationDto, UpdateCertificationDto } from './dto/create-certification.dto';
import { Certification, CertificationDocument } from './schemas/certification.schema';

@Injectable()
export class CertificationService {
    constructor(@InjectModel(Certification.name) private certificationModel: Model<CertificationDocument>) { }

    async create(createCertificationDto: CreateCertificationDto): Promise<Certification> {
        const createdCertification = new this.certificationModel(createCertificationDto);
        return createdCertification.save();
    }

    async findAll(): Promise<Certification[]> {
        return this.certificationModel.find().exec();
    }

    async findOne(id: string): Promise<Certification> {
        const certification = await this.certificationModel.findById(id).exec();
        if (!certification) throw new NotFoundException(`Certification #${id} not found`);
        return certification;
    }

    async update(id: string, updateCertificationDto: UpdateCertificationDto): Promise<Certification> {
        const existingCertification = await this.certificationModel.findByIdAndUpdate(id, updateCertificationDto, { new: true }).exec();
        if (!existingCertification) throw new NotFoundException(`Certification #${id} not found`);
        return existingCertification;
    }

    async remove(id: string): Promise<Certification> {
        const deletedCertification = await this.certificationModel.findByIdAndDelete(id).exec();
        if (!deletedCertification) throw new NotFoundException(`Certification #${id} not found`);
        return deletedCertification;
    }
}
