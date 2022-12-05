/* eslint-disable import/extensions */
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import urlController from '../controller/urlController.js';
import docs from '../docs/index.js';
import thirdPartyAuthRoute from './thirdPartyAuthRoute.js';
import adminRoute from './adminRoute.js';
import userRoute from './userRoute.js';
import debugRoute from './debugRoute.js';

const router = express.Router();

const route = app => {
  // Main function for both user and guest
  router.post('/shorten', urlController.shortenURL);
  router.get('/:url', urlController.getOriginalURLFromShortenedURL);

  app.use('/debug', debugRoute);
  app.use('/user', userRoute);
  app.use('/admin', adminRoute);
  app.use('/auth', thirdPartyAuthRoute);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
  return (app.use('/', router));
};

export default route;
