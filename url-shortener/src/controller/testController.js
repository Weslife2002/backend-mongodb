/* eslint-disable import/extensions */
import axios from 'axios';
import dotenv from 'dotenv';
import qs from 'querystring';
import sendEmail from '../utils/sendEmail.js';

dotenv.config();

const testController = {
  googleLogin: async (req, res) => {
    res.redirect(getGoogleOAuthURL());
  },
  googleGetAccessToken: async (req, res) => {
    const { code } = req.query;
    const response = await getGoogleOAuthTokens({ code });
    console.log(response);
  },
  googleLoginCallback: async (req, res) => {
    res.send('ok');
  },
  sendEmail: async (req, res) => {
    sendEmail('Weslife200218112@gmail.com', 'Hello World', 'This is the test!');
  },
};

function getGoogleOAuthURL() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: 'http://localhost:8081/google-get-access-token',
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      // 'https://www.googleapis.com/auth/user.addresses.read',
      // 'https://www.googleapis.com/auth/user.birthday.read',
      // 'https://www.googleapis.com/auth/user.phonenumbers.read',
    ].join(' '),
  };
  console.log(options);

  const queryURL = new URLSearchParams(options);
  console.log(queryURL.toString());

  return `${rootUrl}?${queryURL.toString()}`;
}

async function getGoogleOAuthTokens({ code }) {
  const url = 'https://oauth2.googleapis.com/token';
  // const url = 'https://accounts.google.com/o/oauth2/token';
  console.log({ code });
  const value = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: 'http://localhost:8081/google-get-access-token',
    grant_type: 'authorization_code',
  };
  console.log(value);
  try {
    const res = await axios.post(url, qs.encode(value, null, null, { encodeURIComponent: x => x }), {
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log(typeof res.data);

    return ({ header: res.headers, reponse: res, reponse_data: res.data });
    // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    // const ticket = await client.verifyIdToken({
    //   idToken: res.data,
    //   audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    //   // Or, if multiple clients access the backend:
    //   // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    // });
    // const payload = ticket.getPayload();
    // const userid = payload.sub;
    // // If request specified a G Suite domain:
    // // const domain = payload['hd'];

    // return { payload, userid };
  } catch (error) {
    console.log(error);
    return ({ error });
  }
}

export default testController;
