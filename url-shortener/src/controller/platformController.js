/* eslint-disable import/extensions */
import redisClient from '../services/redisClient.js';

const platformController = {
  deviceTypeList: (req, res) => res.render('user/platform.ejs'),
  successMessage: (req, res) => {
    req.session.device = req.body.description;
    res.send('OK');
  },
  disableDevice: async (req, res) => {
    const sessionIdList = await redisClient.lrange(`user:${req.body.email}`, 0, -1);
    await sessionIdList.forEach(async sessionId => {
      const rawSessionValue = await redisClient.get(sessionId);
      if (rawSessionValue) {
        const sessionValue = JSON.parse(rawSessionValue);
        if (sessionValue.device === req.body.device) {
          redisClient.del(sessionId);
        }
      }
    });
    res.send('The device is logged out!');
  },
};

export default platformController;
