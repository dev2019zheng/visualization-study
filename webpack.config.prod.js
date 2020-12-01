// ./webpack.config.js
const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const prodConfig = {
  output: {
    path: path.resolve(__dirname, './dist/static'),
    filename: 'js/[name]-[hash:6].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src'),
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag' // 将所有的style标签合并成⼀个
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, './src'),
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  optimization: {
    usedExports: true
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:6].css' // 使用hash版本
    }),
    new optimizeCss({
      cssProcessor: require('cssnano')
    })
  ]
};

module.exports = merge(baseConfig, prodConfig);
