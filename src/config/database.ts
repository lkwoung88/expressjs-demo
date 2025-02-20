import { Sequelize } from 'sequelize';
import { initMember } from '../models/member';

const sequelize = new Sequelize('currency', 'bailey', '9712', {
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
    logging: true,
    define: {
        underscored: true,
    },
});

initMember(sequelize);

export default sequelize;
