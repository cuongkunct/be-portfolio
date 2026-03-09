import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JWT_SECRET, JWT_EXPIRATION, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRATION } from '../../common/constant/app.contant';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && await bcrypt.compare(pass, user.passwordHash)) {
            const { passwordHash, ...result } = user.toObject();
            return result;
        }
        return null;
    }

    async getTokens(userId: string, username: string, role: string) {
        const payload = { sub: userId.toString(), username, role };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: JWT_SECRET as string,
                expiresIn: JWT_EXPIRATION as any,
            }),
            this.jwtService.signAsync(payload, {
                secret: JWT_REFRESH_SECRET as string,
                expiresIn: JWT_REFRESH_EXPIRATION as any,
            }),
        ]);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async login(user: any) {
        const tokens = await this.getTokens(user._id.toString(), user.username, user.role);
        await this.usersService.setCurrentRefreshToken(tokens.refresh_token, user._id.toString());

        return {
            ...tokens,
            user: {
                id: user._id.toString(),
                username: user.username,
                role: user.role
            }
        };
    }

    async register(registerDto: any) {
        return this.usersService.create(registerDto);
    }

    async refreshTokens(userId: string, refreshToken: string) {
        const user = await this.usersService.getUserIfRefreshTokenMatches(refreshToken, userId);

        if (!user) {
            throw new UnauthorizedException('Access Denied');
        }

        const tokens = await this.getTokens(user._id.toString(), user.username, user.role);
        await this.usersService.setCurrentRefreshToken(tokens.refresh_token, user._id.toString());

        return tokens;
    }

    async logout(userId: string) {
        return this.usersService.removeRefreshToken(userId);
    }
}
