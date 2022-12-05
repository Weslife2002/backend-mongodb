/* eslint-disable no-console */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/extensions
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
