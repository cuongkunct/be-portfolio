import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederService } from './seeder.service';
import { Skill, SkillSchema } from '../skills/schemas/skill.schema';
import { Education, EducationSchema } from '../education/schemas/education.schema';
import { Certification, CertificationSchema } from '../certification/schemas/certification.schema';
import { Project, ProjectSchema } from '../projects/schemas/project.schema';
import { Blog, BlogSchema } from '../blog/schemas/blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Skill.name, schema: SkillSchema },
      { name: Education.name, schema: EducationSchema },
      { name: Certification.name, schema: CertificationSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Blog.name, schema: BlogSchema },
    ]),
  ],
  providers: [SeederService],
})
export class SeederModule { }
