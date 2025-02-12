import request from 'supertest';
import express from 'express';
import { expect } from 'chai';
import logging from "../../src/middleware/logging";
import sinon from 'sinon';

const app = express();
app.use(logging);
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

describe('Logging Middleware', () => {
    it('should log the request and response', async () => {
        const consoleSpy = sinon.spy(console, 'log');

        await request(app)
            .get('/')
            .expect(200);

        expect(consoleSpy.calledWithMatch(/\[.*\] GET \/ - IP:/)).to.be.true;
        expect(consoleSpy.calledWithMatch(/\[.*\] GET \/ - Status: 200/)).to.be.true;

        consoleSpy.restore();
    });
});
