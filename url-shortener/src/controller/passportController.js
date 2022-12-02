/* eslint-disable import/extensions */
import UAParser from 'ua-parser-js';
import redisClient from '../services/redisClient.js';

const passportController = {
  handleSession: (req, res) => {
    req.session.user = req.session.passport.user;
    delete req.session.passport;
    redisClient.lpush(`user:${req.session.user.email}`, `sess:${req.session.id}`);
    redisClient.pexpire(`user:${req.session.user.email}`, process.env.SESSION_TIME_OUT);
    const userAgent = UAParser(req.headers['user-agent']);
    req.session.device = `${userAgent.browser.name} ${userAgent.browser.version} on ${userAgent.os.name} ${userAgent.os.version} ${userAgent.cpu.architecture}`;
    res.redirect('/');
  },
};

export default passportController;
