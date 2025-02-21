import { Sequelize } from 'sequelize';
import { initMember } from '../models/member';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.DB_DATABASE || '';
const username = process.env.DB_USER || '';
const password = process.env.DB_PASSWORD || '';
const host = process.env.DB_HOST || '';
const port : number = parseInt(process.env.DB_PORT || '0000');

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres',
    port: port,
    logging: true,
    define: {
        underscored: true,
    },
});

initMember(sequelize);

export default sequelize;
