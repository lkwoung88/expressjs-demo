import { Model, DataTypes, Sequelize } from 'sequelize';

export class Member extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
}

export const initMember  = (sequelize: Sequelize) => {
    Member.init({
        no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'members',
    });
};
