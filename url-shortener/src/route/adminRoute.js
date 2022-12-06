/* eslint-disable import/extensions */
import express from 'express';
import adminController from '../controller/adminController.js';

const adminRoute = express.Router();

// Admin basic - CRUD
adminRoute.post('/', adminController.createAdmin);

// Admin auth - Login, logOut
adminRoute.post('/login', adminController.authAdmin);
adminRoute.get('/log-out', adminController.processLogOut);

// Admin function - Delete specific url, user, disable account.
adminRoute.delete('/user/:email', adminController.deleteUser);
// router.delete('/admin/url/:url', adminController.deleteShortenURL);
adminRoute.get('/disable/:email', adminController.disableUser);

export default adminRoute;
