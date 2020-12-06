const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
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
    path: path.resolve(__dirname, './dist'),
    filename: 'simpleqbn.bundle.js',
  }
};