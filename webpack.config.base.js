// ./webpack.config.js
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const isProd = process.env.NODE_ENV === 'production';

function mulHtmlSetup() {
  const entry = {};
  const htmlWebpackPlugins = [];
  const styleJsFiles = glob
    .sync(path.join(__dirname, './src/js/**/*.style.js'))
    .map((p) => path.join(p));
  // 页面打包
  const entryFiles = glob.sync(path.join(__dirname, './src/pages/**/*.js'));
  entryFiles.forEach((entryFile, _) => {
    const matchs = entryFile.match(/src\/pages\/(.*)\/(.*)\.js$/);
    // 'D:/dev2019/visualization-study/src/pages/pixijs/ch01/ch01.js'
    // 'pixijs/ch01'
    const packName = matchs[1];
    // 'ch01'
    const pageName = matchs[2];
    // 打包目录，默认根目录
    let buildPackName = '';

    if (packName.indexOf('/') >= 0) {
      const packs = packName.split('/');
      // 存在多层级，去掉最后一层
      packs.pop();
      // 'pixijs/ch01' -> 'pixijs/'
      buildPackName = packs.join('/') + '/';
    }

    entry[pageName] = entryFile;
    const stylePath = path.resolve(__dirname, `src/js/${pageName}.style.js`);
    const exists = styleJsFiles.includes(stylePath);
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
          `src/pages/${packName}/${pageName}.html`
        ),
        filename: `${isProd ? '..' : '.'}/${buildPackName}${pageName}.html`,
        chunks: ['jquery-lib', 'common-style', pageName + '-style', pageName],
        inject: 'true',
        hash: true,
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
}

const { entry, htmlWebpackPlugins } = mulHtmlSetup();

module.exports = {
  entry: {
    // 通用css
    'common-style': path.resolve(__dirname, './src/js/common.style.js'),
    'jquery-lib': 'jquery',
    ...entry,
  },
  resolve: {
    //配置别名，在项目中可缩减引用路径
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@lib': path.resolve(__dirname, 'src/js/lib'),
      roughjs: 'roughjs/bundled/rough.esm.js',
    },
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
              limit: 2000,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        include: path.resolve(__dirname, './src'),
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:6].[ext]',
            outputPath: 'images/',
            limit: 2048,
          },
        },
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$', 'jQuery'],
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), ...htmlWebpackPlugins],
};
