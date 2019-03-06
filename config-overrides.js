/* config-overrides.js */
/* eslint-disable */
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function override(config, env) {
  config.resolve = {
    ...config.resolve,
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  };
  config.plugins = [...config.plugins, new BundleAnalyzerPlugin()];
  return config;
};
