/* eslint-disable import/extensions */
import cryptoRandomString from 'crypto-random-string';
import { User, URL } from '../models/index.js';

const urlController = {
  shortenURL: async (req, res) => {
    try {
      if (req.body.url === undefined) {
        return res.status(422).send({
          message: 'Shotern url failed',
          error: 'Missing url field',
        });
      }
      const shortenUrl = cryptoRandomString({ length: 10, type: 'url-safe' });
      const newUrl = { shortenUrl, originalUrl: req.body.url, clickNo: 0 };
      const newUrlInstances = await URL.insertMany([newUrl]);
      if (req.session.user) {
        await User.updateOne(
          { email: req.session.user.email },
          { $push: { urlList: newUrlInstances[0]._id } },
        );
      }
      return res.status(200).send({
        message: 'url is shorten',
        data: newUrl,
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Something went wrong!',
        error,
      });
    }
  },

  getOriginalURLFromShortenedURL: async (req, res) => {
    try {
      const urlInstance = await URL.findOne({ shortenUrl: req.params.url });
      if (!urlInstance) {
        return res.status(404).send({
          errCode: -5,
          message: 'The shorten url is not found',
        });
      }
      URL.updateOne({ _id: urlInstance._id }, { $inc: { clickNo: 1 } });
      return res.status(200).send({
        message: 'Successfully retrieve the shorten url',
        data: {
          shortenURL: req.params.shortenURL,
          originalURL: urlInstance.originalUrl,
        },
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
          message: 'Unauthorized',
          error: 'Login required',
        });
      }

      const urlInstance = await URL.findOne({
        shortenUrl: req.params.url,
      });
      if (!urlInstance) {
        return res.status(404).send({
          message: 'Not found',
          error: 'The shortened URL does not exists',
        });
      }
      User.updateOne({
        email: req.session.user.email,
        urlList: urlInstance._id,
      }, { $pull: { urlList: urlInstance._id } }).then(
        result => {
          if (result.modifiedCount !== 1) {
            return res.status(403).send({
              message: 'Unauthorized',
              error: 'You cannot delete the URL you do not own!',
            });
          }
          URL.deleteOne({ shortenUrl: req.params.url });
          return res.status(200).send({
            message: 'The shortened URL is deleted!',
            data: {
              result,
            },
          });
        },
      );
    } catch (error) {
      return res.status(500).send({
        message: 'Something went wrong!',
        error,
      });
    }
  },
};

export default urlController;
