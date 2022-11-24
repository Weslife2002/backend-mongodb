/* eslint-disable import/extensions */
import express from 'express';
import homeController from '../controller/homeController.js';
import userController from '../controller/userController.js';
import urlController from '../controller/urlController.js';

const router = express.Router();

const initWebroute = app => {
  router.get('/', homeController.getHomePage);
  router.get('/login', homeController.getLoginPage);
  router.get('/sign-up', homeController.getSignUpPage);
  // This is for testing purpose only
  router.get('/get-session', homeController.getSession);

  router.get('/statistics', userController.getStatitics);
  router.post('/create-user', userController.createUser);
  router.post('/login', userController.login);

  router.get('/:url', urlController.redirect);
  router.post('/shorten', urlController.shortenURL);
  router.get('/delete/:url', urlController.deleteShortenURL);

  return (app.use('/', router));
};

export default initWebroute;
