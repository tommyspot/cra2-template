/* config-overrides.js */
const path = require('path');

/* eslint-disable */
module.exports = function override(config, env) {
  config.resolve = {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  };
  return config;
};
