// src/user/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'vtiger_portalinfo' }) // Specify the custom table name
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_name' }) // Map to the user_name column
    username: string;

    @Column({ name: 'user_password' }) // Map to the user_password column
    password: string;

    @Column({ name: 'type' }) // Map to the type column
    type: string;

    @Column({ name: 'cryptmode' }) // Map to the cryptmode column
    cryptmode: string;

    @Column({ name: 'last_login_time' }) // Map to the last_login_time column
    lastLoginTime: Date;

    @Column({ name: 'login_time' }) // Map to the login_time column
    loginTime: Date;

    @Column({ name: 'logout_time' }) // Map to the logout_time column
    logoutTime: Date;

    @Column({ name: 'isactive' }) // Map to the isactive column
    isActive: number;
}
export default User;