const {
  override,
  addWebpackAlias,
  fixBabelImports,
  addLessLoader,
  addBundleVisualizer
} = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  process.env.BUNDLE_VISUALIZE === '1' && addBundleVisualizer(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#D24344' }
  })
);
