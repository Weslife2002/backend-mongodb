/* eslint-disable import/extensions */
import redisClient from '../services/redisClient.js';

const deviceController = {
  getDeviceList: async (req, res) => {
    const sessionIdList = await redisClient.lrange(`user:${req.body.email}`);
    const asyncRawSessionList = [];
    sessionIdList.forEach(sessionId => {
      asyncRawSessionList.push(redisClient.get(sessionId));
    });
    const rawSessionList = await Promise.all(asyncRawSessionList);
    const sessionList = rawSessionList.map(rawSessionValue => JSON.parse(rawSessionValue));
    const deviceList = sessionList.map(session => session.device);
    res.status(200).send({ deviceList });
  },
  successMessage: (req, res) => {
    req.session.device = req.body.description;
    res.send('OK');
  },
  disableDevice: async (req, res) => {
    const sessionIdList = await redisClient.lrange(`user:${req.body.email}`, 0, -1);
    sessionIdList.forEach(async sessionId => {
      const rawSession = await redisClient.get(sessionId);
      if (rawSession) {
        const session = JSON.parse(rawSession);
        if (session.device === req.body.device) {
          redisClient.del(sessionId);
        }
      }
    });
    res.send('The device is logged out!');
  },
};

export default deviceController;
