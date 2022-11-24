/* eslint-disable import/extensions */
import { User } from '../models/User.js';

const userController = {
  createUser: async (req, res) => {
    if (req.body.username === undefined || req.body.password === undefined) {
      return res.status(422).send({
        errCode: -2,
        message: 'Missing field',
      });
    }
    try {
      const existedUser = await User.findOne({
        username: req.body.username,
      });
      if (existedUser) {
        return res.status(403).send({
          errCode: -2,
          message: 'Duplicated username',
        });
      }
      const newUser = await User.insertMany([{
        username: req.body.username,
        password: req.body.password,
        urlList: [],
      }]);
      return res.status(200).send({
        message: 'Successfully create new user',
        data: { newUser: newUser[0] },
      });
    } catch (err) {
      return res.status(400).send({
        errCode: -2,
        message: err,
      });
    }
  },

  login: async (req, res) => {
    try {
      if (req.body.username === undefined || req.body.password === undefined) {
        return res.status(422).send({
          errCode: -2,
          message: 'Missing field',
        });
      }
      const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
      });
      if (user) {
        req.session.user = user;
        return res.status(200).send({
          message: 'Successfully Login',
          data: { user },
        });
      }
      return res.status(401).send({
        errCode: -2,
        message: 'Wrong username or password',
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
        const response = await User.findOne({ username: req.session.user.username }).populate('urlList');
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
