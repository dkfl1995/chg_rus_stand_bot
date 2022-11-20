const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  stats: 'verbose',
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
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.build.json' })],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  node: {
    __dirname: true,
    __filename: true,
  },
  optimization: {
    minimize: false,
  },
  output: {
    library: {
      type: 'commonjs',
    },
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};
