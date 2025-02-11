import { Express, Request, Response } from 'express';
import memberRouter from "./route/v1/memberRoute"
import logging from "./middleware/logging";

const express = require('express');
const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(logging);
app.use('/api/v1/members', memberRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express! 🎉');
});

app.listen(port, () => {
    console.log(`🔥 Server is running at http://localhost:${port}`);
});

export default app;
