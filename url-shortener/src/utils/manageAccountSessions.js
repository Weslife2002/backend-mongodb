/* eslint-disable import/extensions */
import UAParser from 'ua-parser-js';
import redisClient from '../services/redisClient.js';
import hash from './hash.js';

function manageAccountSessions(req) {
  redisClient.lpush(`user:${req.session.user.email}`, `sess:${req.session.id}`);
  redisClient.pexpire(`user:${req.session.user.email}`, process.env.SESSION_TIME_OUT);
  const userAgent = UAParser(req.headers['user-agent']);
  req.session.loginTime = Date.now();
  req.session.device = {
    deviceId: hash(req.session.loginTime + req.ip + Math.floor(Math.random() * 4294967296)),
    description: `${userAgent.browser.name} ${userAgent.browser.version} on ${userAgent.os.name} ${userAgent.os.version} ${userAgent.cpu.architecture}`,
  };
}

export default manageAccountSessions;
