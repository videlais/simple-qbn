const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.js'),
  resolve: {
    alias: {
      'quis': path.resolve(__dirname, 'node_modules/quis/build/quis.cjs')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|test|notes|docs)/,
        use: ['babel-loader'],
        resolve: {
          fullySpecified: false // disable
        }
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'simpleqbn.bundle.js',
  }
};