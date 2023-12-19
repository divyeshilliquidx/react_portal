// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { databaseConfig } from './database.config';
import { UserController } from './user/user.controller'; // Add this line
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Ensure this line is present
    TypeOrmModule.forRoot(databaseConfig),
    // TypeOrmModule.forRoot(cliConfig),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'Divyesh12*',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [UserService, AuthService],
})
export class AppModule { }
