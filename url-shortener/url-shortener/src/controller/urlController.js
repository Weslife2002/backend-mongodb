/* eslint-disable import/extensions */
import cryptoRandomString from 'crypto-random-string';
import _ from 'lodash';
import { User } from '../models/User.js';
import { URL } from '../models/URL.js';

const urlController = {
  shortenURL: async (req, res) => {
    try {
      if (req.body.url === undefined) {
        return res.status(422).send({
          message: 'Missing field',
          errCode: -2,
        });
      }
      const shortenUrl = cryptoRandomString({ length: 10, type: 'url-safe' });
      if (req.session.user) {
        const newUrl = { shortenUrl, originalUrl: req.body.url, count: 0 };
        const newUrlInstance = await URL.insertMany([newUrl]);
        await User.updateOne(
          { username: req.session.user.username },
          { $push: { urlList: newUrlInstance[0]._id } },
        );
        return res.status(200).send({
          message: 'url is shorten',
          data: newUrl,
        });
      }
      const newUrl = { shortenUrl, originalUrl: req.body.url };
      await URL.insertMany([newUrl]);
      return res.status(200).send({
        message: 'url is shorten',
        data: newUrl,
      });
    } catch (err) {
      return res.status(500).send({
        errCode: -3,
        message: err,
      });
    }
  },

  redirect: async (req, res) => {
    try {
      const urlInstance = await URL.findOne({ shortenUrl: req.params.url });
      if (urlInstance) {
        await URL.updateOne({ _id: urlInstance._id }, { $inc: { clickNo: 1 } });
        return res.redirect(urlInstance.originalUrl);
      }
      return res.status(404).send({
        errCode: -5,
        message: 'The shorten url is not found',
      });
    } catch (err) {
      return res.status(500).send({
        errCode: -3,
        message: err,
      });
    }
  },

  deleteShortenURL: async (req, res) => {
    try {
      if (req.session.user === undefined) {
        return res.status(403).send({
          message: 'Login required',
          errCode: -2,
        });
      }

      const userInstance = await User.findOne({
        username: req.session.user.username,
      }).populate('urlList');

      const ownTheUrl = _.findIndex(
        userInstance.data,
        urlDetail => urlDetail.shortenURL === req.params.url,
      ) !== -1;

      if (!ownTheUrl) {
        return res.status(403).send({
          errCode: -2,
          message: 'Only owner can delete the shorten url',
        });
      }
      // const urlInstance = await URL.findOne({ shortenUrl: req.params.url });
      if (urlInstance) {
        // await URL.deleteOne({ shortenUrl: req.params.url });
        return res.status(200).send({
          message: 'Successfully delete the url',
          data: urlInstance,
        });
      }
      return res.status(404).send({
        errCode: -2,
        message: 'Successfully delete the url',
      });
    } catch (err) {
      return res.status(500).send({
        errCode: -3,
        message: JSON.stringify(err),
      });
    }
  },
};

export default urlController;
