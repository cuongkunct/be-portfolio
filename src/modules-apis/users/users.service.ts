import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userModel.findOne({ username: createUserDto.username });
        if (existingUser) {
            throw new ConflictException('Username already exists');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

        const newUser = new this.userModel({
            username: createUserDto.username,
            passwordHash: hashedPassword,
        });

        return newUser.save();
    }

    async findOne(username: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ username }).exec();
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }

    async setCurrentRefreshToken(refreshToken: string, userId: string) {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userModel.findByIdAndUpdate(userId, {
            refreshToken: currentHashedRefreshToken
        });
    }

    async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
        const user = await this.findById(userId);
        if (!user || !user.refreshToken) {
            return null;
        }

        const isRefreshTokenMatching = await bcrypt.compare(
            refreshToken,
            user.refreshToken
        );

        if (isRefreshTokenMatching) {
            return user;
        }
        return null;
    }

    async removeRefreshToken(userId: string) {
        return this.userModel.findByIdAndUpdate(userId, {
            $unset: { refreshToken: "" }
        });
    }
}
