/* eslint-disable import/extensions */
import redisClient from '../services/redisClient.js';

const passportController = {
  handleSession: (req, res) => {
    req.session.user = req.session.passport.user;
    delete req.session.passport;
    redisClient.lpush(`user:${req.session.user.username}`, `sess:${req.session.id}`);
    redisClient.pexpire(`user:${req.session.user.username}`, process.env.SESSION_TIME_OUT);
    res.redirect('/');
  },
};

export default passportController;
