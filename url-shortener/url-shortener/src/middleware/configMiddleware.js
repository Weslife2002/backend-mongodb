/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import ConnectRedis from 'connect-redis';
import passport from 'passport';
import passpostGoogle from 'passport-google-oauth20';
import facebookStrategy from 'passport-facebook';
import redisClient from '../services/redisClient.js';
import { User } from '../models/User.js';

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

  // Using google Authentication.
  const GoogleStrategy = passpostGoogle.Strategy;
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  }, async (accessToken, _, tokenDetail, profile, done) => {
    if (profile.id) {
      User.findOne({ username: profile.emails[0].value })
        .then(existingUser => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              password: profile.id,
              username: profile.emails[0].value,
            })
              .save()
              .then(user => {
                done(null, user);
              });
          }
        });
    }
  }));

  const FacebookStrategy = facebookStrategy.Strategy;
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['email'],
      },
      ((accessToken, _, tokenDetail, profile, done) => {
        const { email } = profile;
        User.find({ username: email })
          .then(existingUser => {
            if (existingUser) {
              done(null, existingUser);
            } else {
              new User({
                username: email,
              }).save()
                .then(user => done(null, user));
            }
          });
      }),
    ),
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((username, done) => {
    User.find({ username })
      .then(user => {
        done(null, user);
      });
  });

  // body-parser middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json()); // To parse the incoming requests with JSON payloads
  app.use(bodyParser.json());
};

export default configMiddleware;
