import sequelize from '../config/database';
import { Member } from '../models/member';

exports.signup = async (username: string, email: string, password: string) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const newMember = await Member.create({
                username,
                email,
                password // TODO: 비밀번호 암호화
            }, { transaction: t });

            return newMember;
        });
        return result;
    } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
        throw error;
    }
};
