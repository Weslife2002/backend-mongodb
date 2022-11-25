/* eslint-disable no-console */
/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import redis from './redis.js';
import { seedData, deleteAllData } from './manipulateData.js';

// const scan = promisify(redis.scan).bind(redis);

dotenv.config();

const filterKey = async pattern => {
  deleteAllData();
  seedData(process.env.SIMULATE_DATA_NO);
  const found = [];
  let cursor = '0';
  do {
    // eslint-disable-next-line no-await-in-loop
    const reply = await Promise.all([redis.scan(cursor, 'MATCH', pattern)]);
    cursor = reply[0][0];
    found.push(...reply[0][1]);
  } while (cursor !== '0');

  redis.quit();
  console.log(found);
  return found;
};

const pattern = process.argv.slice(2);
filterKey(pattern);
