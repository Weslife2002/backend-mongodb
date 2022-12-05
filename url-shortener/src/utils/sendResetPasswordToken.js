/* eslint-disable import/extensions */
import cryptoRandomString from 'crypto-random-string';
import redisClient from '../services/redisClient.js';
import sendEmail from './sendEmail.js';

function sendResetPasswordToken(email) {
  const token = cryptoRandomString({ length: 32, type: 'url-safe' });
  redisClient.set(token, email);
  redisClient.pexpire(token, process.env.RESET_PASSWORD_TOKEN_TIME_OUT);
  sendEmail(
    email,
    '[URL-SHORTENER] Password Reset Request',
    `This is the link to your email request: http://localhost:8081/user/reset-password/${token}`,
  );
}

export default sendResetPasswordToken;
