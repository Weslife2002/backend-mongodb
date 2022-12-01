/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import ConnectRedis from 'connect-redis';
import passport from 'passport';
import configPassport from '../configs/configPassport.js';
import redisClient from '../services/redisClient.js';

const RedisStore = ConnectRedis(session);

const configMiddleware = app => {
  // session middleware
  app.use(session({
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: true,
    cookie: {
      maxAge: Number(process.env.SESSION_TIME_OUT),
      secure: false,
      httpOnly: true,
    },
    resave: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  configPassport();

  // body-parser middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json()); // To parse the incoming requests with JSON payloads
  app.use(bodyParser.json());
};

export default configMiddleware;
