/* eslint-disable import/extensions */
import express from 'express';
import {
  userController,
  urlController,
  deviceController,
} from '../controller/index.js';

const userRoute = express.Router();

// User basic - CRUD
userRoute.post('/', userController.createUser);

// Login and Sign-up management
userRoute.post('/login', userController.authUser);
userRoute.get('/log-out', userController.logUserOut);
// User forgot password-management
userRoute.post('/forgot-password', userController.forgotPassword);
userRoute.post('/reset-password/:token', userController.resetPassword);

// User main function URL-management - For only logined user
userRoute.delete('/url/:url', urlController.deleteShortenURL);
userRoute.get('/url/statistics', userController.getStatitics);
// User-device management
userRoute.get('/devices', deviceController.getDeviceList);
userRoute.get('/device/disable/:deviceId', deviceController.disableDevice);

export default userRoute;
