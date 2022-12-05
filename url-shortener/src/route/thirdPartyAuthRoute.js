/* eslint-disable import/extensions */
import express from 'express';
import passport from 'passport';
import passportController from '../controller/passportController.js';

const thirdPartyAuthRoute = express.Router();

thirdPartyAuthRoute.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
thirdPartyAuthRoute.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: true }),
  passportController.handleSession,
);
thirdPartyAuthRoute.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
thirdPartyAuthRoute.get(
  '/google/callback',
  passport.authenticate('google', { session: true }),
  passportController.handleSession,
);

export default thirdPartyAuthRoute;
