// 导入path模块
let path = require('path')
module.exports = {
    // 公共路径
    publicPath: './',
    // 配置webpack http 服务 devServer
    devServer: {
        // 在指定的dist目录开启http服务
        contentBase: path.resolve(__dirname, "dist"),
        // 端口
        port: 8080,
        // 自动打开浏览器
        open: true,
        // 代理服务器地址
        // 数据接口地址：
        // 例如： 
        // 原来访问： http://127.0.0.1:3000/example
        // 现在访问： http://127.0.0.1:8080/api/example
        proxy: {
            //代理api
            '/api': {
                // 代理接口(服务器地址1)
                target: 'http://apimobile.meituan.com',
                //是否跨域
                changeOrigin: true,
                //重写路径
                pathRewrite: {
                    //代理路径
                    '^/api': ''
                }
            },
            '/bpi': {
                // 代理接口(服务器地址2) 
                // https://m.178hui.com/list
                // http://localhost:8080/bpi/list
                target: 'https://m.178hui.com',
                //是否跨域
                changeOrigin: true,
                //重写路径
                pathRewrite: {
                    //代理路径
                    '^/bpi': ''
                }
            },
        }
    }
}