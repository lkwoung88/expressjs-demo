import {NextFunction, Request, Response} from 'express';
import {exchangeRates} from "../../model/exchangeRates";

const express = require('express');
const router = express.Router();

router.post('/convert', (req: Request, res :Response) => {

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

export default router;
