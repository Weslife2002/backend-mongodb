/* eslint-disable import/extensions */
/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { faker } from '@faker-js/faker';
import app from '../../src/app.js';
import { User } from '../../src/models/User.js';
import { URL } from '../../src/models/URL.js';

const should = chai.should();

chai.use(chaiHttp);
// Our parent block
describe('Test all apis', () => {
  beforeEach(done => {
    // Empty all the users and urls in database.
    User.deleteMany({}).then().catch(
      err => { console.log(err); },
    );
    URL.deleteMany({}).then().catch(
      err => { console.log(err); },
    );
    done();
  });

  it('/create-user should create new user', done => {
    const username = faker.internet.userName();
    const password = faker.internet.password();
    chai.request(app)
      .post('/create-user')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ username, password })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.data.should.have.property('newUser');
        const { newUser } = res.body.data;
        newUser.should.be.a('object');
        newUser.should.have.property('username').eql(username);
        newUser.should.have.property('password').eql(password);
        newUser.should.have.property('urlList').eql([]);
        newUser.should.have.property('_id');
        done();
      });
  });

  it('/login should validate the user as correct', done => {
    const username = faker.internet.userName();
    const password = faker.internet.password();
    User.insertMany([{ username, password }]).then().catch();
    chai.request(app)
      .post('/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ username, password })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.data.should.have.property('user');
        const { user } = res.body.data;
        user.should.have.property('username').eql(username);
        user.should.have.property('password').eql(password);
        user.should.have.property('urlList').to.be.a('array');
        done();
      });
  });

  it('/getStatitics should return a list of url with clickNo', done => {
    let Cookies;
    const mainRequest = chai.request(app).get('/statistics');
    const username = faker.internet.userName();
    const password = faker.internet.password();
    User.insertMany([{ username, password }]).then().catch();
    chai.request(app)
      .post('/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ username, password })
      .end((err, res) => {
        Cookies = res.header['set-cookie'].pop().split(';')[0];
        mainRequest.cookies = Cookies;
        mainRequest.end((request, response) => {
          response.should.have.status(200);
          response.body.should.have.property('message').eql('Successfully retrieve the statistics');
          response.body.should.have.property('data').eql([]);
          done();
        });
      });
  });

  it('/shorten should return a shorten url', done => {
    const url = faker.internet.url();
    chai.request(app)
      .post('/shorten')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ url })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('url is shorten');
        res.body.data.should.have.property('shortenUrl');
        res.body.data.should.have.property('originalUrl').eql(url);
        done();
      });
  });

  it('/:url should return a list of url with clickNo', done => {
    const originalUrl = 'https://www.google.com/';
    let shortenUrl;
    chai.request(app)
      .post('/shorten')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ url: originalUrl })
      .end((err, res) => {
        shortenUrl = res.body.data.shortenUrl;
        console.log('shortenUrl:', shortenUrl);
        chai.request(app)
          .get(`/${shortenUrl}`)
          .end((error, response) => {
            response.should.have.status(200);
            done();
          });
      });
  });
});
