import {NextFunction, Request, Response} from 'express';

const memberService = require('../service/memberService');

exports.signup = async (req: Request, res: Response) => {
    console.log(req.body);
    const {username, email, password} = req.body;
    memberService.signup(username, email, password);
    res.redirect('/');
};
