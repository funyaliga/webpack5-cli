const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

// webpack开发 配置文件
const webpackConfig = require('../config/webpack.dev');
// 自定义日志输出

const logger = require('./logger');

// 服务配置
const config = require('../config/config');

const { port, host } = config.dev; // 监听的端口号

// 编译器
const compiler = Webpack(webpackConfig);

//  devServer 参数
const devServerOptions = {
  ...webpackConfig.devServer,
  open: true, // 自动打开浏览器
  compress: true, // gzip 压缩
  port,
  host,
};

const server = new WebpackDevServer(devServerOptions, compiler);

server.startCallback(async (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, 'localhost');
});
