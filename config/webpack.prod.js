// 生产环境配置

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");

module.exports = require("./webpack.common")({
  mode: "production",
  devtool: "source-map",
  plugins: [
    // 打包前清空build目录文件
    new CleanWebpackPlugin(),
    
    // 打包进度条美化
    new ProgressBarPlugin({
      format:
        `${chalk.green.bold("build[:bar]")} ` +
        chalk.green.bold(":percent") +
        " (:elapsed seconds)",
      clear: false,
      width: 60,
    }),
  ],
  stats: "normal", //标准输出
});
