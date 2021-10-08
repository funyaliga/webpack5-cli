module.exports = {
  assets: {
    imageInlineSizeLimit: 4 * 1024, // 4k, 图片变data URI资源的大小
  },
  dev: {
    deployUrl: "127.0.0.0:8080", // 本地代码推推送到指定服务器
    proxyUrlMap: {
      "/api": "localtion:3000", // 代理的接口
      "/api2": "localtion:4000", // 代理的接口
    },
    port: 9000, //端口号,
    host: "localhost", //主机号
  }
};
