const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

const plugins = [
  new HtmlWebpackPlugin({
    title: 'E-Document',
    chunks: ['login'],
    meta: {
      author: 'Łukasz Lach',
      viewport: 'width=device-width, initial-scale=1',
    },
    publicPath: path.sep,
    template: path.resolve(__dirname, 'templates', 'login.hbs'),
    filename: 'login.hbs',
  }),
  new HtmlWebpackPlugin({
    title: 'E-Document',
    chunks: ['app'],
    meta: {
      author: 'Łukasz Lach',
      viewport: 'width=device-width, initial-scale=1',
    },
    publicPath: path.sep,
    template: path.resolve(__dirname, 'templates', 'app.hbs'),
    filename: 'app.hbs',
  }),
];

module.exports = (env) => {
  const isProduction = process.env.MODE === 'production';

  return {
    mode: process.env.MODE,
    entry: {
      login: path.resolve(__dirname, 'src', 'login', 'login.tsx'),
      app: path.resolve(__dirname, 'src', 'app', 'app.tsx'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
    },
    target: 'web',
    watch: !isProduction,
    devtool: isProduction ? false : 'inline-source-map',
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
        },
        {
          test: /\.png$/,
          use: [{ loader: 'url-loader', options: { limit: 8192 } }],
        },
      ],
    },
    plugins,
  };
};
