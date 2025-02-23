export type ExchangeRateResponse = {
    result: "success" | "error";
    documentation: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
    base_code: string;
    conversion_rates: {
        USD: number;
        KRW: number;
        JPY: number;
        EUR: number;
        GBP: number;
        CNY: number;
        VND: number;
        THB: number;
        AUD: number;
        NZD: number;
        CAD: number;
    };
};

