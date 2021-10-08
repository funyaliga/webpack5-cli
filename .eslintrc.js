/*
"off"或者0    //关闭规则关闭
"warn"或者1    //在打开的规则作为警告（不影响退出代码）
"error"或者2    //把规则作为一个错误（退出代码触发时为1）
*/
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base', // 包含所欲ES6+ 规范
    'plugin:react/recommended', // react jsx 规范支持
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'consistent-return': 0, // 箭头函数不强制return
    'no-console': 0, // 不禁用console
    'import/no-extraneous-dependencies': 0,
    'func-names': 0,
    'import/no-unresolved': [
      2,
      {
        ignore: ['^@'], // @ 是设置的路径别名
      },
    ],
  },
  // 如果在webpack.config.js中配置了alias 并且在import时使用了别名需要安装eslint-import-resolver-webpack
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      webpack: {
        config: './config/webpack.dev.js',
      },
    },
  },
};
