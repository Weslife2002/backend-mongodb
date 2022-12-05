/* eslint-disable import/extensions */
import createAdmin from './createAdmin.js';

export default {
  paths: {
    '/admin': {
      ...createAdmin,
    },
  },
};
