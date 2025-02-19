import {Express, NextFunction, Request, Response} from 'express';
import memberRouter from "./route/v1/memberRoute"
import currencyRouter from "./route/v1/currencyRoute";
import authRouter from "./route/v1/authRoute";
import logging from "./middleware/logging";
import {exchangeRates} from "./model/exchangeRates";
import path from "node:path";

const express = require('express');
const app: Express = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logging);

app.use('/member', memberRouter);
app.use('/currency', currencyRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`🔥 Server is running at http://localhost:${port}`);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!❤️‍🩹');
})

app.get('/', (req: Request, res: Response) => {
    res.render('index', { rates: exchangeRates, result: null });
});

export default app;
