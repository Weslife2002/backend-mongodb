/* eslint-disable import/extensions */
import basicInfo from './basicInfo.js';
import servers from './servers.js';
import components from './components.js';
import tags from './tags.js';
import admin from './admin/index.js';

export default {
  ...basicInfo,
  ...servers,
  ...components,
  ...tags,
  ...admin,
};
