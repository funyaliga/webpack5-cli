module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {},
    ],
    [
      "@babel/preset-react",
      {
        development: process.env.NODE_ENV === "development",
      },
  ],
  ],
  plugins: [
    ["@babel/plugin-proposal-optional-chaining", {}],
    ["@babel/plugin-proposal-nullish-coalescing-operator", {}],
    "@babel/plugin-syntax-dynamic-import", // 支持动态加载import
  ],
};