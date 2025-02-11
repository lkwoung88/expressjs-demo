import {NextFunction} from "express";
import {Request, Response} from 'express';

const logging = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip;

    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);

    // 응답이 완료된 후 상태 코드 로깅
    res.on('finish', () => {
        console.log(`[${timestamp}] ${method} ${url} - Status: ${res.statusCode}`);
    });

    next();
};

export default logging;
