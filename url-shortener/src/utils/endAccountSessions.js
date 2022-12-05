/* eslint-disable import/extensions */
import redisClient from '../services/redisClient.js';

async function endAccountSessions(email) {
  const sessionIds = await redisClient.lrange(`user:${email}`, 0, -1);
  if (sessionIds) {
    sessionIds.forEach(sessionId => {
      redisClient.del(sessionId);
    });
  }
  redisClient.del(`user:${email}`);
}

export default endAccountSessions;
