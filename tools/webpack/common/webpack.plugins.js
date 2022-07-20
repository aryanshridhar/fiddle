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
      const rootDir = module.resourceResolveData.descriptionFileRoot;
      console.log(path.join(rootDir, './static'));
      return JSON.stringify(path.join(rootDir, './static'));
    }, true),
  }),
];

// 3 ideas -

// * Use process.cwd() to check the file root path
// * Use path.resolve insteed of path.join and run
// * Use the current method (should be at the last priority)
// * Look through the docs better and figure out the best way
