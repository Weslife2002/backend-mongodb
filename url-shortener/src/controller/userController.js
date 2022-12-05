/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import hash from '../utils/hash.js';
import redisClient from '../services/redisClient.js';
import { User } from '../models/index.js';
import {
  manageAccountSessions,
  sendResetPasswordToken,
} from '../utils/index.js';
import endAccountSessions from '../utils/endAccountSessions.js';

dotenv.config();

const userController = {
  logUserOut: async (req, res) => {
    req.session.destroy();
    res.status(200).send({
      message: 'You have logged out',
      data: {},
    });
  },
  createUser: async (req, res) => {
    if (req.session.user) {
      return res.status(403).send({
        message: 'Create new user failed!',
        error: 'You need to log out before signing up',
      });
    }
    if (req.body.email === undefined || req.body.password === undefined) {
      return res.status(422).send({
        message: 'Create new user failed!',
        error: 'Missing field',
      });
    }
    try {
      const existedUser = await User.findOne({ email: req.body.email });
      if (existedUser) {
        return res.status(403).send({
          message: 'Create new user failed!',
          error: 'Duplicate email',
        });
      }
      await User.insertMany([{
        email: req.body.email,
        password: hash(req.body.password),
      }]);
      req.session.user = { email: req.body.email };
      manageAccountSessions(req);
      return res.status(200).send({
        message: 'Successfully create new user',
        data: {
          user: req.session.user,
        },
      });
    } catch (error) {
      return res.status(400).send({
        message: 'Something went wrong!',
        error,
      });
    }
  },

  authUser: async (req, res) => {
    if (req.session.user) {
      return res.status(403).send({
        message: 'Login failed',
        error: 'You need to log out before login again',
      });
    }
    if (req.body.email === undefined || req.body.password === undefined) {
      return res.status(422).send({
        message: 'Login failed',
        error: 'Missing field',
      });
    }
    User.findOne({
      email: req.body.email,
      password: hash(req.body.password),
    }).then(user => {
      if (!user) {
        return res.status(401).send({
          message: 'Login failed',
          error: 'Wrong email or password',
        });
      }
      req.session.user = { email: req.body.email };
      manageAccountSessions(req);
      return res.status(200).send({
        message: 'Login successfully',
        data: {
          user: {
            email: user.email,
          },
        },
      });
    }).catch(error => res.status(500).send({
      message: 'Something went wrong',
      error,
    }));
  },

  getStatitics: async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(403).send({
          errCode: -2,
          message: 'You must login to see this page',
        });
      }
      const response = await User.findOne({ email: req.session.user.email }).populate('urlList');
      return res.status(200).send({
        message: 'Successfully retrieve the statistics',
        data: response.urlList,
      });
    } catch (err) {
      return res.status(500).send({
        errCode: -2,
        message: err,
      });
    }
  },

  forgotPassword: (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        return res.status(422).send({
          message: 'Request failed!',
          error: 'The email you provide does not exist',
        });
      }
      sendResetPasswordToken(req.body.email);
      return res.status(200).send({
        message: 'Check your email to see the link where you can reset the password.',
        data: {},
      });
    }).catch(error => res.status(500).send({
      message: 'Something went wrong!',
      error,
    }));
  },

  resetPassword: async (req, res) => {
    const userEmail = await redisClient.get(req.params.token);
    if (!userEmail) {
      return res.status(404).send({
        message: 'Cannot reset the password!',
        error: 'The link has expired!',
      });
    }
    User.updateOne({ email: userEmail }, { password: hash(req.body.newPassword) }).then(
      () => {
        endAccountSessions(userEmail);
        res.status(200).send({
          message: 'Successfully reset the password!',
        });
      },
    ).catch(error => res.status(400).send({
      message: 'Something went wrong!',
      error,
    }));
  },
};

export default userController;
