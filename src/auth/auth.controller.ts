import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: 'Register a new admin user' })
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @ApiOperation({ summary: 'Login admin user' })
    @ApiBody({ type: LoginDto })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        // req.user is populated by LocalStrategy after successful validation
        return this.authService.login(req.user);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current logged in user profile' })
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
