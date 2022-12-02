/* eslint-disable import/extensions */
import express from 'express';
import passport from 'passport';
import homeController from '../controller/homeController.js';
import userController from '../controller/userController.js';
import urlController from '../controller/urlController.js';
import adminController from '../controller/adminController.js';
import passportController from '../controller/passportController.js';
import testController from '../controller/testController.js';
import deviceController from '../controller/deviceController.js';

const router = express.Router();

const initWebroute = app => {
  // User-management
  router.get('/', homeController.getHomePage);
  router.get('/login', homeController.getLoginPage);
  router.get('/sign-up', homeController.getSignUpPage);

  // Testing purpose only
  router.get('/get-session', homeController.getSession);

  // User-account device management
  router.post('/device/list', deviceController.getDeviceList);
  router.get('/device/disable/:device', deviceController.disableDevice);
  router.post('/device/info', deviceController.successMessage);

  // Login and Sign-up management
  router.get('/statistics', userController.getStatitics);
  router.post('/create-user', userController.createUser);
  router.post('/login', userController.login);
  router.get('/log-out', userController.processLogOut);

  // URL-management
  router.get('/:url', urlController.redirect);
  router.post('/shorten', urlController.shortenURL);
  router.delete('/:url', urlController.deleteShortenURL);

  // Under-development functions.
  router.get('/google-auth', testController.googleLogin);
  router.get('/google-get-access-token', testController.googleGetAccessToken);
  router.get('/google-login-callback', testController.googleLoginCallback);

  // Using passport for Facebook and Google login.
  router.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: [
      'email',
    ] }),
  );
  router.get(
    '/auth/google',
    passport.authenticate('google', { scope: [
      'profile',
      'email',
      'https://www.googleapis.com/auth/user.addresses.read',
      'https://www.googleapis.com/auth/user.phonenumbers.read',
      'https://www.googleapis.com/auth/user.birthday.read',
    ] }),
  );
  router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { session: true }),
    passportController.handleSession,
  );
  router.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: true }),
    passportController.handleSession,
  );

  // Admin
  router.get('/admin/sign-up', adminController.getSignUpPage);
  router.post('/admin/sign-up', adminController.createAdmin);
  router.get('/admin/login', adminController.getLoginPage);
  router.post('/admin/login', adminController.processAdminLogin);
  router.get('/admin/log-out', adminController.processLogOut);

  router.get('/admin/dashboard', adminController.getDashboard);
  router.get('/admin/user-dashboard', adminController.getUserDashboard);
  router.get('/admin/URL-dashboard', adminController.getURLDashboard);

  router.delete('/admin/user/:email', adminController.deleteUser);
  router.delete('/admin/url/:url', adminController.deleteUser);
  router.get('/admin/disable/:email', adminController.disableUser);

  return (app.use('/', router));
};

export default initWebroute;
