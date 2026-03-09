import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/create-skill.dto'; // Need to use standard update DTO
import { Skill, SkillDocument } from './schemas/skill.schema';

@Injectable()
export class SkillsService {
    constructor(@InjectModel(Skill.name) private skillModel: Model<SkillDocument>) { }

    async create(createSkillDto: CreateSkillDto): Promise<Skill> {
        const createdSkill = new this.skillModel(createSkillDto);
        return createdSkill.save();
    }

    async findAll(): Promise<Skill[]> {
        return this.skillModel.find().exec();
    }

    async findOne(id: string): Promise<Skill> {
        const skill = await this.skillModel.findById(id).exec();
        if (!skill) throw new NotFoundException(`Skill #${id} not found`);
        return skill;
    }

    async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
        const existingSkill = await this.skillModel.findByIdAndUpdate(id, updateSkillDto, { new: true }).exec();
        if (!existingSkill) throw new NotFoundException(`Skill #${id} not found`);
        return existingSkill;
    }

    async remove(id: string): Promise<Skill> {
        const deletedSkill = await this.skillModel.findByIdAndDelete(id).exec();
        if (!deletedSkill) throw new NotFoundException(`Skill #${id} not found`);
        return deletedSkill;
    }
}
