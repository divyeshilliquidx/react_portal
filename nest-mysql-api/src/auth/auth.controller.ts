// src/auth/auth.controller.ts

import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import User from '../user/user.entity'; // Add this line

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() user): Promise<User> {
        try {
            return this.authService.register(user);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('login')
    async login(@Body() user): Promise<{ access_token: string }> {
        try {
            const result = await this.authService.validateUser(
                user.username,
                user.password,
            );
            if (!result) {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
            }

            const token = await this.authService.generateToken(result);
            return { access_token: token };
        } catch (error) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }
}
