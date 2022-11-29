/* eslint-disable import/extensions */
/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { faker } from '@faker-js/faker';
import cryptoRandomString from 'crypto-random-string';
import app from '../../src/app.js';
import { User } from '../../src/models/User.js';
import { URL } from '../../src/models/URL.js';

const should = chai.should();

chai.use(chaiHttp);
// Our parent block
describe('Test all apis', () => {
  beforeEach(done => {
    // Empty all the users and urls in database.
    User.deleteMany({}).then().catch();
    URL.deleteMany({}).then().catch();
    done();
  });

  it('/create-user should return Duplicated username', done => {
    const username = faker.internet.userName();
    const password = faker.internet.password();
    User.insertMany([{ username, password }]).then().catch();
    chai.request(app)
      .post('/create-user')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ username, password })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql('Duplicated username');
        res.body.should.have.property('errCode').eql(-2);
        done();
      });
  });

  it('/create-user should return missing field', done => {
    const password = faker.internet.password();
    chai.request(app)
      .post('/create-user')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ password })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('message').eql('Missing field');
        res.body.should.have.property('errCode').eql(-2);
        done();
      });
  });

  it('/create-user should return missing field', done => {
    const username = faker.internet.userName();
    chai.request(app)
      .post('/create-user')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ username })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('message').eql('Missing field');
        res.body.should.have.property('errCode').eql(-2);
        done();
      });
  });

  it('/login should inform wrong username or password', done => {
    const username = faker.internet.userName();
    const password = faker.internet.password();
    chai.request(app)
      .post('/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ username, password })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Wrong username or password');
        res.body.should.have.property('errCode').eql(-2);
        done();
      });
  });

  it('/login should inform missing field', done => {
    const password = faker.internet.password();
    chai.request(app)
      .post('/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ password })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('message').eql('Missing field');
        res.body.should.have.property('errCode').eql(-2);
        done();
      });
  });

  it('/login should inform missing field', done => {
    const username = faker.internet.userName();
    chai.request(app)
      .post('/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ username })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('message').eql('Missing field');
        res.body.should.have.property('errCode').eql(-2);
        done();
      });
  });

  it('/getStatitics should return a list of url with unauthorize status code when not login', done => {
    chai.request(app)
      .get('/statistics')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql('You must login to see this page');
        res.body.should.have.property('errCode').eql(-2);
        done();
      });
  });

  it('/:url should return url not found', done => {
    const url = `/${cryptoRandomString({ length: 10, type: 'url-safe' })}`;
    chai.request(app)
      .get(url)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('The shorten url is not found');
        res.body.should.have.property('errCode').eql(-5);
        done();
      });
  });

  it('/shorten should return missing field', done => {
    chai.request(app)
      .post('/shorten')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({})
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('message').eql('Missing field');
        res.body.should.have.property('errCode').eql(-2);
        done();
      });
  });
});
