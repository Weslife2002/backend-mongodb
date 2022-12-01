/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import redisClient from '../services/redisClient.js';
import { User } from '../models/User.js';

dotenv.config();

const userController = {
  processLogOut: async (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  },
  createUser: async (req, res) => {
    if (req.body.email === undefined || req.body.password === undefined) {
      return res.status(422).send({
        errCode: -2,
        message: 'Missing field',
      });
    }
    try {
      const existedUser = await User.findOne({ email: req.body.email });
      if (existedUser) {
        return res.status(403).send({
          errCode: -2,
          message: 'Duplicated email',
        });
      }
      await User.insertMany([{
        email: req.body.email,
        password: req.body.password,
        urlList: [],
      }]);
      req.session.user = { email: req.body.email, password: req.body.password, urlList: [] };
      if (!req.session.device) {
        return res.redirect('/sign-up');
      }
      redisClient.lpush(`user:${req.body.email}`, `sess:${req.session.id}`);
      redisClient.pexpire(`user:${req.body.email}`, process.env.SESSION_TIME_OUT);
      return res.redirect('/');
    } catch (err) {
      return res.status(400).send({
        errCode: -2,
        message: err,
      });
    }
  },

  login: async (req, res) => {
    try {
      if (req.body.email === undefined || req.body.password === undefined) {
        return res.status(422).send({
          errCode: -2,
          message: 'Missing field',
        });
      }
      const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      if (user) {
        req.session.user = user;
        if (!req.session.device) {
          return res.redirect('/login');
        }

        redisClient.lpush(`user:${user.email}`, `sess:${req.session.id}`);
        redisClient.pexpire(`user:${req.body.email}`, process.env.SESSION_TIME_OUT);
        return res.redirect('/');
      }
      return res.status(401).send({
        errCode: -2,
        message: 'Wrong email or password',
      });
    } catch (err) {
      return res.status(500).send({
        errCode: -2,
        message: err,
      });
    }
  },

  getStatitics: async (req, res) => {
    try {
      if (req.session.user) {
        const response = await User.findOne({ email: req.session.user.email }).populate('urlList');
        return res.status(200).send({
          message: 'Successfully retrieve the statistics',
          data: response.urlList,
        });
      }
      return res.status(403).send({
        errCode: -2,
        message: 'You must login to see this page',
      });
    } catch (err) {
      return res.status(500).send({
        errCode: -2,
        message: err,
      });
    }
  },
};

export default userController;
