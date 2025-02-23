import sequelize from '../config/database';
import { Member } from '../models/member';
import bcrypt from 'bcrypt';

exports.signup = async (username: string, email: string, password: string) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const newMember = await Member.create({
                username,
                email,
                password: bcrypt.hashSync(password, 10),
            }, { transaction: t });

            return newMember;
        });
        return result;
    } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
        throw error;
    }
};

export default exports;
