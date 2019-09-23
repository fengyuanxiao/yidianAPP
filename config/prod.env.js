'use strict'
module.exports = {
  // 配置打包模式为测试服务器还是生产服务器，默认为生产服务器
  NODE_ENV: process.env.NODE_ENV ? ('"' + process.env.NODE_ENV + '"') : '"production"'
}
