/* eslint-disable import/extensions */
import redisClient from '../services/redisClient.js';

const deviceController = {
  getDeviceList: async (req, res) => {
    if (!req.session.user) {
      return res.status(403).send({
        message: 'Forbidden',
        error: 'You must login to see the device list',
      });
    }
    const sessionIdList = await redisClient.lrange(`user:${req.session.user.email}`, 0, -1);
    const asyncRawSessionList = [];
    sessionIdList.forEach(sessionId => {
      asyncRawSessionList.push(redisClient.get(sessionId));
    });
    const rawSessionList = await Promise.all(asyncRawSessionList);
    const sessionListWithNull = rawSessionList.map(
      rawSessionValue => (rawSessionValue ? JSON.parse(rawSessionValue) : null),
    );
    const sessionList = sessionListWithNull.filter(n => n);
    const deviceList = sessionList.map(session => session.device);
    return res.status(200).send({ deviceList });
  },
  successMessage: (req, res) => {
    req.session.device = req.body.description;
    res.send('OK');
  },
  disableDevice: async (req, res) => {
    if (!req.session.user) {
      return res.status(403).send({
        error: 'Unauthorized!',
        message: 'You must login to do this action',
      });
    }
    const sessionIdList = await redisClient.lrange(`user:${req.session.user.email}`, 0, -1);
    sessionIdList.forEach(async sessionId => {
      const rawSession = await redisClient.get(sessionId);
      if (rawSession) {
        const session = JSON.parse(rawSession);
        if (session.device === req.params.device) {
          redisClient.del(sessionId);
        }
      }
    });
    return res.status(200).send('The device is logged out!');
  },
};

export default deviceController;
