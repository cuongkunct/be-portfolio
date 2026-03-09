import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { Education, EducationSchema } from './schemas/education.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Education.name, schema: EducationSchema }]),
  ],
  providers: [EducationService],
  controllers: [EducationController],
  exports: [EducationService],
})
export class EducationModule { }
