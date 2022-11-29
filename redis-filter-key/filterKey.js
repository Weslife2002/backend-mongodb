/* eslint-disable no-console */
/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import redis from './redis.js';
import { seedData, deleteAllData } from './manipulateData.js';

// const scan = promisify(redis.scan).bind(redis);

dotenv.config();

const filterKey = async pattern => {
  const found = [];
  let cursor = '0';
  do {
    // eslint-disable-next-line no-await-in-loop
    const reply = await redis.scan(cursor, 'MATCH', pattern);
    console.log(reply);
    cursor = reply[0];
    found.push(...reply[1]);
  } while (cursor !== '0');
  console.log(found);
  return found;
};

deleteAllData();
seedData(process.env.SIMULATE_DATA_NO);
const pattern = process.argv.slice(2);
filterKey(pattern);
deleteAllData();
