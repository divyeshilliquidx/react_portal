// src/user/user.controller.ts

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import User from './user.entity'; // Add this line

@Controller('vtiger_portalinfo')
@UseGuards(AuthGuard())
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User | undefined> {
        return this.userService.findById(Number(id));
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post()
    async createUser(@Body() userDto: Partial<User>): Promise<User> {
        return this.userService.create(userDto);
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() userDto: Partial<User>,
    ): Promise<User | undefined> {
        return this.userService.update(Number(id), userDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User | null> {
        return this.userService.delete(Number(id));
    }
}
