import {Express, NextFunction, Request, Response} from 'express';
import memberRouter from "./route/memberRoute"
import currencyRouter from "./route/currencyRoute";
import authRouter from "./route/authRoute";
import logging from "./middleware/logging";
import {exchangeRates} from "./models/exchangeRates";
import path from "node:path";
import {HttpError} from "./type/CustomError";
import session from "express-session";

const express = require('express');
const app: Express = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logging);
app.use(session({
    secret: 'currency',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // https를 사용하지 않을 때는 false
}));

app.use('/member', memberRouter);
app.use('/currency', currencyRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`🔥 Server is running at http://localhost:${port}`);
});

app.get('/', (req: Request, res: Response) => {
    res.render('index', { rates: exchangeRates, result: null });
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (err.statusCode === 403) {
        console.error('403 에러 발생:', err.message);
        return res.status(403).render('403');
    }
    next(err);
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (err.statusCode === 404) {
        console.error('404 에러 발생:', err.message);
        return res.status(404).render('404');
    }
    next();
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    console.error('500 에러 발생:', err.message, err.stack);
    res.status(500).render('500');
});

export default app;
