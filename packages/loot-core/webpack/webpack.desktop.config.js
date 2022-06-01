let path = require('path');
let webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  target: 'node',
  entry: path.join(__dirname, '../src/server/main.ts'),
  context: path.resolve(__dirname, '../../..'),
  devtool: 'source-map',
  output: {
    path: path.resolve(path.join(__dirname, '/../lib-dist')),
    filename: 'bundle.desktop.js',
    sourceMapFilename: 'bundle.desktop.js.map',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.electron.js', '.js', '.ts', '.json'],
    alias: {
      'perf-deets': require.resolve('perf-deets/noop')
    }
  },
  externals: [
    'better-sqlite3',
    'node-ipc',
    'electron-log',
    'node-fetch',
    'node-libofx'
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-jwl-app']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /original-fs/
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  }
};
