import {NextFunction, Request, Response} from 'express';
import {exchangeRates} from "../models/exchangeRates";
import currencyService from '../service/currencyService';

// todo validate request
exports.convert = async (req: Request, res: Response) => {
    const { amount, fromCurrency, toCurrency } = req.body;
    const result = await currencyService.convert(amount, fromCurrency, toCurrency);
    res.render('index', {
        rates: exchangeRates,
        result: {
            amount,
            fromCurrency,
            toCurrency,
            value: result.toFixed(2)
        }
    });
}
