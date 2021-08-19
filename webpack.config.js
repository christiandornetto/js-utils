const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  return {
    mode: 'production',
    entry: {
      index: path.resolve(__dirname, './dist/index.js'),
    },
    output: {
      path: path.resolve(__dirname, './dist'), // builds to ./dist/umd/
      filename: 'umd/[name].js', // index.js
      library: 'JSUtils', // aka window.myLibrary
      libraryTarget: 'umd', // supports commonjs, amd and web browsers
      globalObject: 'this',
    },
    module: {
      rules: [{ test: /\.t|js$/, use: 'babel-loader' }],
    },
    plugins: [new CleanWebpackPlugin({ dry: true })],
  };
};
