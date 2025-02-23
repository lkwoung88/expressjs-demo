import {Member} from "../models/member";
import bcrypt from "bcrypt";
import {HttpError} from "../types/CustomError";

exports.signin = async (username: string, password: string): Promise<Member> => {
    try {
        const member = await Member.findOne({ where: { username } });

        if (!member) {
            throw new Error('존재하지 않는 사용자입니다.');
        }

        const isValidPassword = bcrypt.compareSync(password, member.password);
        if (!isValidPassword) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }

        return member;
    } catch (error) {
        console.error(error);
        throw new HttpError(500, '로그인 중 오류 발생');
    }
}

export default exports;
