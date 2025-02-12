import {Request, Response} from 'express';

const express = require('express');
const router = express.Router();

interface Order {
    id: string;
    memberId: string;
    productId: string;
    quantity: number;
}

const ordersMemory = new Map<string, Order>();

router.use((req: Request, res: Response, next: Function) => {
    console.log('order api is called 🤩');
    next();
}, (req: Request, res: Response, next: Function) => {
    console.log('next middleware 🤩');
    next();
});

router.get('/:page', (req: Request, res: Response) => {

    const page: number = Number.parseInt(req.params.page);
    if (isNaN(page)) {
        res.status(400).json({message: 'Invalid page number'});
        return;
    }
    res.status(200).json({orders: Array.from(ordersMemory.values())});
});

export default router;
