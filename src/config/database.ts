import { Sequelize } from 'sequelize';
import { initMember } from '../models/member';
import dotenv from 'dotenv';

dotenv.config();

const dbenv: NodeJS.ProcessEnv = {
    DB_DATABASE: process.env.DB_DATABASE ?? '',
    DB_USER: process.env.DB_USER ?? '',
    DB_PASSWORD: process.env.DB_PASSWORD ?? '',
    DB_HOST: process.env.DB_HOST ?? '',
    DB_PORT: process.env.DB_PORT ?? '5432',
}!;

if (!dbenv.DB_DATABASE || !dbenv.DB_USER || !dbenv.DB_PASSWORD || !dbenv.DB_HOST) {
    throw new Error('One or more required environment variables are missing.');
}

const sequelize = new Sequelize(dbenv.DB_DATABASE, dbenv.DB_USER, dbenv.DB_PASSWORD, {
    host: dbenv.DB_HOST,
    dialect: 'postgres',
    port: dbenv.DB_PORT ? parseInt(dbenv.DB_PORT) : 5432,
    logging: true,
    define: {
        underscored: true,
    },
});

initMember(sequelize);

export default sequelize;
