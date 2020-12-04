// ./webpack.config.js
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const fse = require('fs-extra');
const isProd = process.env.NODE_ENV === 'production';

function mulHtmlSetup() {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/pages/*/*.js'));
  entryFiles.map(async (entryFile, _) => {
    const matchs = entryFile.match(/src\/pages\/(.*)\/(.*)\.js$/);
    const pageName = matchs[1];
    entry[pageName] = entryFile;
    const stylePath = path.resolve(__dirname, `src/js/${pageName}.style.js`);
    const exists = await fse.pathExists(stylePath);
    if (exists) {
      console.log(`  dev2019zheng ::: ${pageName} style path exist`);
      entry[pageName + '-style'] = path.resolve(
        __dirname,
        `src/js/${pageName}.style.js`
      );
    }
    htmlWebpackPlugins.push(
      new htmlWebpackPlugin({
        template: path.join(
          __dirname,
          `src/pages/${pageName}/${pageName}.html`
        ),
        filename: `${isProd ? '..' : '.'}/${pageName}.html`,
        chunks: ['jquery-lib', 'common-style', pageName + '-style', pageName],
        inject: 'true',
        hash: true
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugins
  };
}

const { entry, htmlWebpackPlugins } = mulHtmlSetup();

module.exports = {
  entry: {
    // 通用css
    'common-style': path.resolve(__dirname, './src/js/common.style.js'),
    'jquery-lib': 'jquery',
    ...entry
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: path.resolve(__dirname, './src'),
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'fonts/[name].[hash:6].[ext]',
              publicPath: '../',
              limit: 2000
            }
          }
        ]
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        include: path.resolve(__dirname, './src'),
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:6].[ext]',
            outputPath: 'images/',
            limit: 2048
          }
        }
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$', 'jQuery']
        }
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(), ...htmlWebpackPlugins]
};
