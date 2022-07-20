const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new webpack.ProvidePlugin({
    __importStar: ['tslib', '__importStar'],
  }),
  new webpack.DefinePlugin({
    STATIC_DIR: webpack.DefinePlugin.runtimeValue(({ module }) => {
      return JSON.stringify(path.join(__filename, '../../../../static'));
    }, true),
  }),
];

// 3 ideas -

// * Use process.cwd() to check the file root path
// * Look through the docs better and figure out the best way
