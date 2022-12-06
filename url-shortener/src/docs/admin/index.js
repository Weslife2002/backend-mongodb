/* eslint-disable import/extensions */
import createAdmin from './createAdmin.js';
import authAdmin from './authAdmin.js';
import processLogOut from './processLogOut.js';
import deleteUser from './deleteUser.js';
import disableUser from './disableUser.js';

export default {
  paths: {
    '/admin': {
      ...createAdmin,
    },
    '/admin/login': {
      ...authAdmin,
    },
    '/admin/log-out': {
      ...processLogOut,
    },
    '/admin/user/:email': {
      ...deleteUser,
    },
    '/admin/disable/:email': {
      ...disableUser,
    },
  },
};
