import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from '../skills/schemas/skill.schema';
import { Education, EducationDocument } from '../education/schemas/education.schema';
import { Certification, CertificationDocument } from '../certification/schemas/certification.schema';
import { Project, ProjectDocument } from '../projects/schemas/project.schema';
import { Blog, BlogDocument } from '../blog/schemas/blog.schema';
import slugify from 'slugify';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
    private readonly logger = new Logger(SeederService.name);

    constructor(
        @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
        @InjectModel(Education.name) private educationModel: Model<EducationDocument>,
        @InjectModel(Certification.name) private certificationModel: Model<CertificationDocument>,
        @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
        @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    ) { }

    async onApplicationBootstrap() {
        const skillCount = await this.skillModel.countDocuments();
        if (skillCount === 0) {
            this.logger.log('Seeding initial data...');
            await this.seed();
        }
    }

    async seed() {
        // 1. Seed Skills
        const mockSkills = [
            { name: "React / Next.js", category: "Frontend" },
            { name: "TypeScript", category: "Frontend" },
            { name: "Tailwind CSS", category: "Frontend" },
            { name: "Node.js", category: "Backend" },
            { name: "Express", category: "Backend" },
            { name: "PostgreSQL", category: "Backend" },
            { name: "Git / GitHub", category: "Tools" },
            { name: "Docker", category: "Tools" },
            { name: "Figma", category: "Tools" },
        ];
        await this.skillModel.insertMany(mockSkills);

        // 2. Seed Education
        const mockEducation = [
            {
                degree: "Bachelor of Software Engineering",
                institution: "University of Technology",
                fieldOfStudy: "Software Engineering",
                startDate: "2018",
                endDate: "2022",
                description: "Graduated with honors. Specialization in web development and software architecture."
            }
        ];
        await this.educationModel.insertMany(mockEducation);

        // 3. Seed Certifications
        const mockCertifications = [
            {
                name: "AWS Certified Developer – Associate",
                organization: "Amazon Web Services",
                issueDate: "2023"
            },
            {
                name: "Meta Front-End Developer Professional",
                organization: "Coursera",
                issueDate: "2022",
            }
        ];
        await this.certificationModel.insertMany(mockCertifications);

        // 4. Seed Projects
        const mockProjects = [
            {
                title: "E-Commerce Platform",
                description: "A full-stack e-commerce application built with Next.js, Stripe, and Prisma.",
                imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
                tags: ["Next.js", "Tailwind CSS", "Stripe", "Prisma"],
                githubLink: "#",
                demoLink: "#"
            },
            {
                title: "Task Management SaaS",
                description: "A collaborative task manager featuring real-time updates using WebSockets.",
                imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
                tags: ["React", "Node.js", "Socket.io", "MongoDB"],
                githubLink: "#"
            },
            {
                title: "AI Image Generator",
                description: "Web interface for an AI image generation model, utilizing OpenAI API.",
                imageUrl: "https://images.unsplash.com/photo-1620712948343-008423675ddb?w=800&q=80",
                tags: ["Next.js", "OpenAI API", "Framer Motion"],
                demoLink: "#"
            }
        ];
        await this.projectModel.insertMany(mockProjects);

        // 5. Seed Blogs
        const mockBlogs = [
            {
                title: "Getting Started with Next.js 14 App Router",
                content: "# Next.js 14 \n\nNext.js 14 is a major release emphasizing performance and developer experience...",
                category: "Web Development",
                date: new Date("2023-11-15"),
                imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
            },
            {
                title: "Tailwind CSS Best Practices for Large Projects",
                content: "# Tailwind in Large Projects\n\nWhen working with Tailwind CSS on large-scale applications, keeping classes organized is crucial...",
                category: "Tutorial",
                date: new Date("2023-12-05"),
                imageUrl: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80"
            },
            {
                title: "10 Tips to Boost Your Developer Productivity",
                content: "# Developer Productivity\n\n1. Use a good IDE.\n2. Master shortcuts...",
                category: "Career",
                date: new Date("2024-01-20"),
                imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
            }
        ];

        for (const blog of mockBlogs) {
            const slug = slugify(blog.title, { lower: true, strict: true, locale: 'vi' });
            await new this.blogModel({ ...blog, slug }).save();
        }

        this.logger.log('Seeding completed successfully.');
    }
}
