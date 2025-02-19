import {NextFunction, Request, Response} from 'express';

const express = require('express');
const router = express.Router();

router.get('/signup', (req: Request, res: Response) => {
    res.render('signup');
});

router.post('/signup', (req: Request, res: Response) => {
    res.redirect('/');
})

interface Member {
    id: string;
    password: string;
    name: string;
}

export default router;
