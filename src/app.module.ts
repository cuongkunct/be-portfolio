import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules-apis/users/users.module';
import { AuthModule } from './modules-apis/auth/auth.module';
import { CloudinaryModule } from './modules-systems/cloudinary/cloudinary.module';
import { SkillsModule } from './modules-apis/skills/skills.module';
import { EducationModule } from './modules-apis/education/education.module';
import { CertificationModule } from './modules-apis/certification/certification.module';
import { ProjectsModule } from './modules-apis/projects/projects.module';
import { BlogModule } from './modules-apis/blog/blog.module';
import { MONGODB_URI } from './common/constant/app.contant';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(MONGODB_URI as string),
    UsersModule,
    AuthModule,
    CloudinaryModule,
    SkillsModule,
    EducationModule,
    CertificationModule,
    ProjectsModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
