// src/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async create(userDto: Partial<User>): Promise<User> {
        const user = this.userRepository.create(userDto);
        return this.userRepository.save(user);
    }

    async update(id: number, userDto: Partial<User>): Promise<User | undefined> {
        await this.userRepository.update(id, userDto);
        return this.findById(id);
    }

    async delete(id: number): Promise<User | null> {
        const user = await this.findById(id);
        if (user) {
            await this.userRepository.remove(user);
            return user;
        }
        return null;
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }
}
