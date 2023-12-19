// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import User from '../user/user.entity'; // Add this line

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async register(userDto: Partial<User>): Promise<User> {
        const existingUser = await this.userService.findByUsername(userDto.username);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const newUser = await this.userService.create({
            username: userDto.username,
            password: hashedPassword,
        });

        return newUser;
    }

    async validateUser(username: string, password: string): Promise<Partial<User> | null> {
        const user = await this.userService.findByUsername(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password: _, ...result } = user;
            return result;
        }
        return null;
    }

    // async generateToken(user: User): Promise<string> {
    //     const payload = { username: user.username, sub: user.id };
    //     return this.jwtService.sign(payload);
    // }

    async generateToken(user: Partial<User>): Promise<string> {
        const payload = { username: user.username, sub: user.id };
        return this.jwtService.sign(payload);
    }
}