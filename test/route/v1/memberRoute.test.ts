import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';

describe('Member Routes', () => {

    describe('GET /api/v1/members', () => {
        it('get members positive test', (done) => {
            request(app)
                .get('/api/v1/members/1')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body).to.have.property('members');
                    expect(res.body.members).to.be.instanceof(Array);
                    done();
                });
        });

        it('get members negative test', (done) => {
            request(app)
                .get('/api/v1/members/invalid')
                .set('Accept', 'application/json')
                .expect(400)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Invalid page number');
                    done();
                });
        });
    });

    describe('POST /api/v1/members', () => {
        it('create member positive test', (done) => {
            request(app)
                .post('/api/v1/members')
                .set('Accept', 'application/json')
                .send({ id: 'test', password: '1234', name: 'test' })
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Member is created');
                    done();
                });
        });
    });

    describe('PUT /api/v1/members', () => {
        it('should return 200 status code', (done) => {
            request(app)
                .put('/api/v1/members')
                .set('Accept', 'application/json')
                .send({ id: 'test', password: '1234', name: 'test' })
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Member is updated');
                    done();
                });
        });
    });

    describe('DELETE /api/v1/members', () => {
        it('should return 200 status code', (done) => {
            request(app)
                .delete('/api/v1/members/test')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Member is deleted');
                    done();
                });
        });
    });

});

