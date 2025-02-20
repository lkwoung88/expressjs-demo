import {NextFunction, Request, Response} from 'express';

const authController = require('../controller/authController');

const express = require('express');
const router = express.Router();

router.get('/signin', (req: Request, res: Response) => {
    res.render('signin');
});

router.post('/signin', (authController.signin));

export default router;
