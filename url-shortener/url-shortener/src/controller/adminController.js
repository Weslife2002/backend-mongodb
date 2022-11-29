/* eslint-disable import/extensions */
import { URL } from '../models/URL.js';
import { User } from '../models/User.js';
import { Admin } from '../models/Admin.js';
import redisClient from '../services/redisClient.js';

const adminController = {
  getDashboard: async (req, res) => {
    const usersdata = await User.find({});
    const URLdata = await URL.find({});
    return res.status(200).render('admin/dashboard.ejs', {
      logined: req.session.admin !== undefined,
      usersdata,
      URLdata,
    });
  },
  processAdminLogin: async (req, res) => {
    try {
      if (req.body.username === undefined || req.body.password === undefined) {
        return res.status(422).send({
          message: 'Authentication failed',
          error: 'Missing required parameter!',
        });
      }
      const admin = await Admin.find({
        username: req.body.username,
        password: req.body.password,
      });
      if (admin) {
        req.session.admin = admin;
        return res.redirect('/admin/dashboard');
      }
      return res.status(403).send({
        message: 'Authentication failed!',
        error: 'Wrong username or password',
      });
    } catch (error) {
      return res.status(400).send({
        message: 'Authentication failed',
        error,
      });
    }
  },
  getUserDashboard: (req, res) => res.render('login.ejs'),
  getURLDashboard: (req, res) => res.render('login.ejs'),
  deleteUser: async (req, res) => {
    try {
      User.deleteOne({ username: req.params.username });
      return res.status(200).send('admin/dashboard.ejs');
    } catch (error) {
      return res.status().send({});
    }
  },
  getSignUpPage: (req, res) => res.render('admin/sign-up.ejs'),
  getLoginPage: (req, res) => res.render('admin/login.ejs'),
  processLogOut: (req, res) => {
    delete req.session.admin;
    res.redirect('/admin/dashboard');
  },
  createAdmin: async (req, res) => {
    try {
      if (req.body.username === undefined || req.body.password === undefined) {
        return res.status(402).send({
          message: 'Create admin failed',
          error: 'Missing required parameters',
        });
      }
      const newAdmin = await Admin.insertMany([req.body]);

      req.session.admin = newAdmin;
      return res.status(200).send({
        message: 'Successfully create new admin!',
        data: newAdmin,
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Create admin failed',
        error: error.writeErrors[0].errmsg,
      });
    }
  },

  disableUser: (req, res) => {
    redisClient.lrange(`user:${req.params.username}`, 0, -1, async (error, result) => {
      if (error) {
        return res.status(500).send({
          message: 'Disable user failed',
          error,
        });
      }
      const delCommands = [];
      result.forEach(sessionKey => {
        delCommands.push(redisClient.del(sessionKey));
      });
      await Promise.all(delCommands);
      return res.status(200).send('OK');
    });
    // const sessionList = await redisClient.get(req.params.username;
  },
};

export default adminController;
