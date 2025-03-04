import {NextFunction, Request, Response} from 'express';
import authService from '../service/authService';
import {SessionData} from "express-session";
import {Member} from "../types/member";

exports.signin = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    const member: Member = await authService.signin(username, password);
    if (member) {
        (req.session as any).data ={
            id: member.no,
            username: member.username
        }
        res.cookie('currency', req.sessionID, { maxAge: 900000, httpOnly: true });
    }
    res.redirect('/');
};
