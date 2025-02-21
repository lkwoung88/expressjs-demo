import {exchangeRates} from "../models/exchangeRates";

exports.convert = async (amount: number, fromCurrency: number, toCurrency: number) => {
    return await amount * (exchangeRates[toCurrency] / exchangeRates[fromCurrency]);
}
