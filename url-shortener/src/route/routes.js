/* eslint-disable import/extensions */
import express from 'express';
import passport from 'passport';
import homeController from '../controller/homeController.js';
import userController from '../controller/userController.js';
import urlController from '../controller/urlController.js';
import adminController from '../controller/adminController.js';
import passportController from '../controller/passportController.js';
import testController from '../controller/testController.js';
import platformController from '../controller/platformController.js';

const router = express.Router();

const initWebroute = app => {
  // User-management
  router.get('/', homeController.getHomePage);
  router.get('/login', homeController.getLoginPage);
  router.get('/sign-up', homeController.getSignUpPage);
  router.get('/get-session', homeController.getSession);
  router.get('/get-session-id', homeController.getSessionId);

  // User-account device management
  router.post('/device-type-list', platformController.deviceTypeList);
  router.post('/platformAutoSend', platformController.successMessage);
  router.post('/disable-device', platformController.disableDevice);

  // Login and Sign-up management
  router.get('/statistics', userController.getStatitics);
  router.post('/create-user', userController.createUser);
  router.post('/login', userController.login);
  router.get('/log-out', userController.processLogOut);
  router.get('/google-auth', testController.googleLogin);
  router.get('/google-get-access-token', testController.googleGetAccessToken);
  router.get('/google-login-callback', testController.googleLoginCallback);

  // Passport route
  router.get('/auth/facebook', passport.authenticate('facebook', { scope: [
    'email',
  ] }));
  router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: true }), passportController.handleSession);
  router.get('/auth/google', passport.authenticate('google', { scope: [
    'profile',
    'email',
    'https://www.googleapis.com/auth/user.addresses.read',
    'https://www.googleapis.com/auth/user.phonenumbers.read',
    'https://www.googleapis.com/auth/user.birthday.read',
  ] }));
  router.get('/auth/google/callback', passport.authenticate('google', { session: true }), passportController.handleSession);

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
