import {ExchangeRateResponse} from "../type/apiResponseSchema";

const apikey = process.env.CURRENCY_API_KEY;
exports.convert = async (amount: number, fromCurrency: string, toCurrency: string) => {
    const rate = await getExchangeRates(fromCurrency, toCurrency);
    return amount * rate;
}

const getExchangeRates = async (baseCurrency: string, targetCurrency: string): Promise<number> => {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apikey}/latest/${baseCurrency}`);
    const data: ExchangeRateResponse = await response.json();
    return data.conversion_rates[targetCurrency as keyof typeof data.conversion_rates];
}
