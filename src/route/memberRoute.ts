import {NextFunction, Request, Response} from 'express';
import { body, validationResult, Result, ValidationError } from "express-validator";

const memberController = require('../controller/memberController');

const express = require('express');
const router = express.Router();

router.get('/signup', (req: Request, res: Response) => {
    res.render('signup');
});

router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).render('signup', { errors: errors.array() });
    }
    next();
}, (memberController.signup));

export default router;
