/* eslint-disable import/extensions */
import _ from 'lodash';
import redis from './redis.js';

async function deleteAllData() {
  await redis.flushdb();
}

async function seedData(n) {
  const commands = [];
  for (let i = 0; i < n; i += 1) {
    const shelf = `shelf${_.random(0, 9) + 1}`;
    const book = `book${_.random(0, 9) + 1}`;
    const key = `${book}:${shelf}`;
    commands.push(redis.set(key, 1));
  }
  await Promise.all(commands);
}

export { seedData, deleteAllData };
