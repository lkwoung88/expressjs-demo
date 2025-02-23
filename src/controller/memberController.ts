import {NextFunction, Request, Response} from 'express';
import memberService from '../service/memberService';

// todo validate request
exports.signup = async (req: Request, res: Response) => {
    const {username, email, password} = req.body;
    memberService.signup(username, email, password);
    res.redirect('/');
};
