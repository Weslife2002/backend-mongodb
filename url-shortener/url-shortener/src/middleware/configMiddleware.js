import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import Redis from 'ioredis';
import ConnectRedis from 'connect-redis';

const RedisStore = ConnectRedis(session);
const redisClient = new Redis();

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

  // body-parser middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json()); // To parse the incoming requests with JSON payloads
  app.use(bodyParser.json());
};

export default configMiddleware;
