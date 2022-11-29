/* eslint-disable import/extensions */
import _ from 'lodash';
import dotenv from 'dotenv';
import redis from './redis.js';

dotenv.config();

async function deleteAllData() {
  const keyList = redis.keys('book*:shelf*');
  (await keyList).forEach(key => redis.del(key));
}

async function seedData(n) {
  const commands = [];
  for (let i = 0; i < n; i += 1) {
    const shelf = `shelf${_.random(process.env.SHELF_MIN, process.env.SHELF_MAX)}`;
    const book = `book${_.random(process.env.BOOK_MIN, process.env.BOOK_MAX) + 1}`;
    const key = `${book}:${shelf}`;
    commands.push(redis.set(key, 1));
  }
  await Promise.all(commands);
}

export { seedData, deleteAllData };
