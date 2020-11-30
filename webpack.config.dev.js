// ./webpack.config.js
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const devConfig = {
  output: {
    path: path.resolve(__dirname, './dev'),
    filename: 'js/[name]-[hash:6].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag', // 将所有的style标签合并成⼀个
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dev'),
    openPage: 'index.html', // 默认页面
    inline: true,
    open: true,
    port: 8081,
    hot: true,
    // watchOptions: {
    //   poll: true,
    // },
    proxy: {
      '/api': {
        target: 'http://localhost:9092/',
      },
    },
  },
  devtool: 'inline-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
module.exports = merge(baseConfig, devConfig);
