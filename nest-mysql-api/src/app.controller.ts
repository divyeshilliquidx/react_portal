// src/app.controller.ts

import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { AuthGuard } from '@nestjs/passport';
import User from './user/user.entity'; // Add this line

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('register')
  async register(@Body() user): Promise<User> {
    return this.authService.register(user);
  }

  @Post('login')
  async login(@Body() user): Promise<{ access_token: string, success: boolean, result: object }> {
    try {
      const result = await this.authService.validateUser(
        user.username,
        user.password,
      );
      if (!result) {
        throw new Error('Invalid credentials');
      }

      const token = await this.authService.generateToken(result);
      return { success: true, result, access_token: token };
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  async getProfile(): Promise<string> {
    return 'Authenticated route';
  }
}
