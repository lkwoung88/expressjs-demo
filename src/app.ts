import {Express, NextFunction, Request, Response} from 'express';
import memberRouter from "./route/v1/memberRoute"
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

app.get('/login', (req: Request, res: Response) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    res.redirect('/');
});

app.post('/convert', (req, res) => {
    const { amount, fromCurrency, toCurrency } = req.body;
    const result = (amount * exchangeRates[toCurrency]) / exchangeRates[fromCurrency];
    res.render('index', {
        rates: exchangeRates,
        result: {
            amount,
            fromCurrency,
            toCurrency,
            value: result.toFixed(2)
        }
    });
});

export default app;
