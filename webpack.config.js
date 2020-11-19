let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log(path.resolve())///Users/zcxiao/Desktop/my_code/webpack-zf 绝对路径


module.exports = {
    devServer: {
        port: 3000,
        contentBase: './build',
        progress: true
    },
    mode: 'development',
    entry: {
        path: './src/index.js'
    },
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // minify:{
            //     removeAttributeQuotes:true, //去双引号
            //     collapseWhitespace:true,//折叠1行
            // },
            // hash:true
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],
    module: {
        rules: [
            //style-loader css插入head标签中
            //css-loader css解析
            {
                test: /\.css$/,
                use: [

                    {
                        loader: MiniCssExtractPlugin.loader,

                    },
                    { loader: 'css-loader' },

                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,

                    },
                   
                    'css-loader',
                    'less-loader',

                ]
            }

        ]
    }

}