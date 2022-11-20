const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  experiments: {
    topLevelAwait: true,
  },
  entry: ['./src/main.ts'],
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'inline-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.build.json' })],
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new NodemonPlugin({
      script: './dist/server.js',
      watch: path.resolve('./dist'),
      nodeArgs: ['--inspect=0.0.0.0:9229'],
      ignore: ['*.js.map', '*.d.ts.map'],
      ext: 'js,ts,json',
      verbose: true,
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
    }),
  ],
  output: {
    library: {
      type: 'commonjs',
    },
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};
