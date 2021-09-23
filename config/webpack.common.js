// 开发环境和生产环境 公共配置

const paths = require("./paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = function (options) {
  return {
    mode: options.mode,
    entry: paths.src, // 入口
    output: {
      path: paths.build,
      publicPath: "/",
    },
    cache: {
      // 使用持久化缓存
      type: "filesystem",
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  "@babel/preset-react",
                ],
              },
            },
          ],
        },
      ],
    },
    devServer: {},
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      ...options.plugins,
    ],
    stats: options.stats, // 打包日志发生错误和新的编译时输出
  };
};
