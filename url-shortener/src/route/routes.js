/* eslint-disable import/extensions */
import express from 'express';
import passport from 'passport';
import homeController from '../controller/homeController.js';
import userController from '../controller/userController.js';
import urlController from '../controller/urlController.js';
import adminController from '../controller/adminController.js';
import redisClient from '../services/redisClient.js';

const router = express.Router();

const initWebroute = app => {
  // # User-management
  router.get('/', homeController.getHomePage);
  router.get('/login', homeController.getLoginPage);
  router.get('/sign-up', homeController.getSignUpPage);
  router.get('/get-session', homeController.getSession);
  router.get('/get-session-id', homeController.getSessionId);

  router.get('/statistics', userController.getStatitics);
  router.post('/create-user', userController.createUser);
  router.post('/login', userController.login);
  router.get('/log-out', userController.processLogOut);
  router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
  router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { session: true }),
    (req, res) => {
      req.session.user = req.session.passport.user;
      delete req.session.passport;
      redisClient.lpush(`user:${req.session.user.username}`, `sess:${req.session.id}`);
      redisClient.pexpire(`user:${req.session.user.username}`, process.env.SESSION_TIME_OUT);
      res.redirect('/');
    },
  );
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: true }),
    (req, res) => {
      req.session.user = req.session.passport.user;
      delete req.session.passport;
      redisClient.lpush(`user:${req.session.user.username}`, `sess:${req.session.id}`);
      redisClient.pexpire(`user:${req.session.user.username}`, process.env.SESSION_TIME_OUT);
      res.redirect('/');
    },
  );

  // # URL-management
  router.get('/:url', urlController.redirect);
  router.post('/shorten', urlController.shortenURL);
  router.get('/delete/:url', urlController.deleteShortenURL);

  router.get('/admin/sign-up', adminController.getSignUpPage);
  router.post('/admin/sign-up', adminController.createAdmin);
  router.get('/admin/login', adminController.getLoginPage);
  router.post('/admin/login', adminController.processAdminLogin);
  router.get('/admin/log-out', adminController.processLogOut);

  router.get('/admin/dashboard', adminController.getDashboard);
  router.get('/admin/user-management', adminController.getUserDashboard);
  router.get('/admin/URL-management', adminController.getURLDashboard);
  router.delete('/admin/user/:username', adminController.deleteUser);
  router.get('/admin/disable/:username', adminController.disableUser);

  return (app.use('/', router));
};

export default initWebroute;
