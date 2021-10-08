// 开发环境和生产环境 公共配置
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const paths = require('./paths');
const config = require('./config');

module.exports = function (options) {
  const isEnvProduction = options.mode === 'production';

  return {
    mode: options.mode,
    entry: paths.src, // 入口
    output: {
      path: paths.build,
      publicPath: '/',
    },
    cache: {
      // 使用持久化缓存
      type: 'filesystem',
    },
    devtool: false,
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    cacheDirectory: true,
                  },
                },
              ],
            },
            {
              test: /\.css$/,
              exclude: /\.module\.css$/,
              use: [
                isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                { loader: 'css-loader', options: { importLoaders: 1 } }, // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                'postcss-loader',
              ],
            },
            {
              test: /\.(scss|sass)$/,
              exclude: /\.module\.(scss|sass)$/,
              use: [
                isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                { loader: 'css-loader', options: { importLoaders: 2 } }, // 查询参数 importLoaders，用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader
                'postcss-loader',
                'sass-loader',
              ],
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              type: 'asset', // 自动
              parser: {
                dataUrlCondition: {
                  maxSize: config.assets.imageInlineSizeLimit,
                },
              },
              // use: [
              //   {
              //     options: {
              //       mozjpeg: { progressive: true, quality: 65 },
              //       optipng: { enabled: false },
              //       pngquant: { quality: '65-90', speed: 4 },
              //       gifsicle: { interlaced: false },
              //       webp: { quality: 75 },
              //     },
              //   },
              // ],
            },
            {
              test: /\.(eot|svg|ttf|woff|woff2?)$/,
              type: 'asset/resource', // 导出 URL（相当于 file-loader）
            },
          ],
        },
      ],
    },
    optimization: {
      moduleIds: 'deterministic', // 默认 根据模块名称生成简短的hash值
      chunkIds: 'deterministic',
      minimize: isEnvProduction,
      minimizer: [
        new CssMinimizerPlugin({
          parallel: true, // 开启多线程压缩
        }),
        new TerserPlugin({
          parallel: true, // 开启多线程压缩
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    },
    devServer: {},
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }), // 让 webpack 不把这些指定的模块打包进去
      ...options.plugins,
    ],
    stats: options.stats, // 打包日志发生错误和新的编译时输出
    resolve: {
      modules: [paths.nodeModules], // 使用第三模块 第一反应去 根目录下的 node_modules 寻找
      extensions: ['.js', '.jsx', '.css'], // import无扩展名时，会依次遍历extensions添加扩展名进行匹配
      alias: { // 在import 或 require 的别名
        moment$: 'moment/moment.js',
        '@src': paths.src,
        '@assets': `${paths.src}/assets`,
      },
    },
  };
};
