/* eslint-disable import/extensions */
import { User, Admin } from '../models/index.js';
import { redisClient } from '../services/index.js';

const adminController = {
  authAdmin: async (req, res) => {
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
      if (!admin) {
        return res.status(403).send({
          message: 'Authentication failed!',
          error: 'Wrong username or password',
        });
      }
      req.session.admin = admin;
      return res.redirect('/admin/dashboard');
    } catch (error) {
      return res.status(400).send({
        message: 'Authentication failed',
        error,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      User.deleteOne({ email: req.params.email });
      return res.status(200).send('The user was deleted');
    } catch (error) {
      return res.status().send({
        message: 'Something wrong',
        error,
      });
    }
  },
  processLogOut: (req, res) => {
    delete req.session.admin;
    res.status(200).send({
      message: 'You have successfully log-out.',
    });
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
    redisClient.lrange(`user:${req.params.email}`, 0, -1, async (error, result) => {
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
  },
};

export default adminController;
