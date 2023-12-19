// database.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const databaseConfig: TypeOrmModuleOptions & { cli: { migrationsDir: string } } = {
    //const databaseConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'vtigercrm8',
    entities: ['dist/**/*.entity.js'], // Add the path to the updated entity file
    migrations: ['dist/migrations/**/*.js'],
    synchronize: false, // Set to false to disable automatic table creation
    cli: {
        migrationsDir: 'src/migrations',
    },
};

export { databaseConfig };