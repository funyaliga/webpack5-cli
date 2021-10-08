// 开发环境配置
const ESLintPlugin = require('eslint-webpack-plugin');
const paths = require('./paths');

module.exports = require('./webpack.common')({
  mode: 'development',
  plugins: [
    new ESLintPlugin({
      fix: true, // 启用ESLint自动修复功能
      extensions: ['js', 'jsx'],
      exclude: ['/node_modules/', 'build'], // 排除的文件/目录
      cache: true, // 缓存
      cwd: paths.src, // 文件根目录
    }),
  ],
  stats: 'errors-only', // 只在发生错误或有新的编译时输出
});
