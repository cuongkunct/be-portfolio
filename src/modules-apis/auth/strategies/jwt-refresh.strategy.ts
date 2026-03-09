import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_REFRESH_SECRET } from '../../../common/constant/app.contant';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_REFRESH_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req: any, payload: any) {
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        return { userId: payload.sub, username: payload.username, role: payload.role, refreshToken };
    }
}
