/* eslint-disable import/extensions */
import { User, Admin } from '../models/index.js';
import endAccountSessions from '../utils/endAccountSessions.js';
import hash from '../utils/hash.js';

const adminController = {
  authAdmin: async (req, res) => {
    try {
      if (req.body.username === undefined || req.body.password === undefined) {
        return res.status(422).send({
          message: 'Authentication failed!',
          error: 'Missing required parameter!',
        });
      }
      Admin.find({
        username: req.body.username,
        password: hash(req.body.password),
      }).then(admin => {
        if (!admin) {
          return res.status(403).send({
            message: 'Authentication failed!',
            error: 'Wrong username or password',
          });
        }
        req.session.admin = { username: admin.username };
        return res.status(200).send({
          message: 'Authentication success!',
          data: {
            admin: {
              username: admin.username,
            },
          },
        });
      });
    } catch (error) {
      return res.status(400).send({
        message: 'Something went wrong!',
        error,
      });
    }
  },

  deleteUser: async (req, res) => {
    if (!req.session.admin) {
      return res.status(403).send({
        message: 'Unauthorized!',
        error: 'You need to login as an admin to delete user',
      });
    }
    try {
      endAccountSessions(req.params.email);
      User.deleteOne({ email: req.params.email });
      return res.status(200).send({
        message: 'The user was deleted',
        data: {},
      });
    } catch (error) {
      return res.status(400).send({
        message: 'Something wrong',
        error,
      });
    }
  },

  processLogOut: (req, res) => {
    delete req.session.admin;
    res.status(200).send({
      message: 'You have successfully log-out.',
      data: {},
    });
  },

  createAdmin: async (req, res) => {
    console.log(req.body);
    if (req.body.username === undefined || req.body.password === undefined) {
      return res.status(402).send({
        message: 'Create admin failed!',
        error: 'Missing required parameters',
      });
    }
    try {
      const { username, password } = req.body;
      await Admin.insertMany([{
        username,
        password: hash(password),
      }]);
      req.session.admin = {
        username,
      };
      return res.status(200).send({
        message: 'Successfully create new admin!',
        data: {
          admin: {
            username,
          },
        },
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Something went wrong!',
        error,
      });
    }
  },

  disableUser: (req, res) => {
    if (!req.session.admin) {
      return res.status(403).send({
        message: 'Unauthorized!',
        error: 'You need to login as an admin to delete user',
      });
    }
    try {
      endAccountSessions(req.params.email);
      return res.status(200).send({
        message: 'The user is disable',
        data: {},
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Something went wrong',
        error,
      });
    }
  },
};

export default adminController;
