import {NextFunction, Request, Response} from 'express';

const express = require('express');
const router = express.Router();

router.get('/signin', (req: Request, res: Response) => {
    res.render('signin');
});

router.post('/signin', (req: Request, res: Response) => {
    res.redirect('/');
});

export default router;
