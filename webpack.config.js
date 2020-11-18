let path = require('path')

console.log(path.resolve())///Users/zcxiao/Desktop/my_code/webpack-zf 绝对路径


module.exports = {
    mode:'development',
    entry:{
        path:'./src/index.js'
    },
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'build')
    }

}