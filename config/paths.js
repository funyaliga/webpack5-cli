// 路径相关

const path = require('path');
const fs = require('fs');

// 获取当前工作目录
const appDirectory = fs.realpathSync(process.cwd());

// 从相对路径中解析绝对路径
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// 默认的模块扩展名
const moduleFileExtensions = ['js', 'jsx', 'ts', 'tsx', 'json'];

// 解析模块路径
const resolveModule = (resolveFn, filePath) => {
  // 查看文件存不存在
  const extension = moduleFileExtensions.find((ext) => fs.existsSync(resolveFn(`${filePath}.${ext}`)));
  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }
  return resolveFn(`${filePath}.js`); // 如果没有默认就是js
};

module.exports = {
  src: resolveApp('src'), // 主文件入口路径
  build: resolveApp('build'), // 打包路径
  html: resolveApp('public/index.html'), // html 模板路径
  index: resolveModule(resolveApp, 'src/index'), // 打包入口路径
  nodeModules: resolveApp('node_modules'), // node_modules 路径
}
