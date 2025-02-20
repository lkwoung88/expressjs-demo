import {NextFunction, Request, Response} from 'express';
import { body, validationResult, Result, ValidationError } from "express-validator";

const memberController = require('../controller/memberController');

const express = require('express');
const router = express.Router();

router.get('/signup', (req: Request, res: Response) => {
    res.render('signup');
});

router.post('/signup', [
    body("username", "username is required").not().isEmpty().trim().isLength({ min: 3 }),
    body("email", "email is required").not().isEmpty().isEmail().normalizeEmail(),
    body("password", "password is required").not().isEmpty().trim().isLength({ min: 6 }),
    body("passwordconfirm", "password confirmation is required").not().isEmpty().trim().custom((value: string, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    })
],(req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('signup', { errors: errors.array() });
    }
    next();
}, (memberController.signup));

export default router;
