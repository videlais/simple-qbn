const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/original.ts'),
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'quis': path.resolve(__dirname, 'node_modules/quis/build/quis.cjs')
    },
    // Help webpack resolve .js imports to .ts files
    extensionAlias: {
      '.js': ['.js', '.ts']
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|test|notes|docs)/,
        use: ['ts-loader'],
        resolve: {
          fullySpecified: false // disable
        }
      },
      {
        test: /\.js$/,
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
    library: 'SimpleQBN',
    libraryTarget: 'umd',
    globalObject: 'this'
  }
};