let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require("webpack");
console.log(path.resolve())///Users/zcxiao/Desktop/my_code/webpack-zf 绝对路径
module.exports = {
    resolve:{  //解析第三方模块
        modules:[path.resolve('node_modules')],
        mainFields:['style','main'], //入口文件
        extensions:['.js','.css','.json'],  //找不到js找css
        alias:{
            bootstrap:'bootstrap/dist/css/bootstrap.css',

        }

    },
    devServer: {
        before(app) {
            //mock数据
            app.get('/list', (req, res) => {
                res.json({
                    name: 'list',
                    age: 18
                })
            })

        },
        port: 8080,
        proxy: {
            '/api': 'http://localhost:3000',
            pathRewrite: {
                '/api': ''
            }
        },
        contentBase: './build',
        progress: true
    },
    watch: true,
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: '/node_modules'

    },
    devtool: 'source-map',//增加映射 
    //帮助调试源代码 eval-souce-map 不会单独打包出映射文件
    //cheap-module-source-map 产生单独的文件
    //cheap-module-eval-source-map 不会单独打包出映射文件打包到一起 显示行不显示列
    entry: {
        home: './src/index.js',
        // other: './src/other.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        //publicPath:'www.baidu.com'   //统一的资源路径
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [

        new OptimizeCSSAssetsPlugin({}),
        new MiniCssExtractPlugin({
            filename: 'css/main.css',
        }),
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),
        new webpack.DefinePlugin({
            'env': '1+1'
          }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // minify:{
            //     removeAttributeQuotes:true, //去双引号
            //     collapseWhitespace:true,//折叠1行
            // },
            // hash:true
            // chunks:['home']
        }),
        // new HtmlWebpackPlugin({
        //     template: './src/index.html',
        //     filename: 'other.html',
        //     chunks:['other']
        // }),
        new webpack.ProvidePlugin({   //为每个模块注入jquery
            $: 'jquery'
        }),
        // new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: "./src/doc", to: "./doc" },//第二个选项是复制后的文件夹名
            ],
        }),
        new webpack.BannerPlugin('write by zcxiao')
    ],
    externals: {
        // jquery:'jquery'  //这样就不会打包 import xxx from 'xxx' 比如用了cdn
    },
    module: {
        noParse:/jquery/,  //不分析jquery是否依赖了其他包
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-withimg-loader',
                        options: {
                        }
                    },
                ],
            },

            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options:{
                    //         esModule:false,
                    //         limit:200*100
                    //     }
                    // },

                    {
                        loader: 'url-loader',
                        options: {
                            limit: 200 * 100,
                            outputPath: 'img/',
                            esModule: false,
                            //publicPath:'www.bilibi.com'
                        }
                    },

                ],
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader', //暴露到window  
                options: {
                    exposes: ['$', 'jQuery'],
                },
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            enforce: 'pre'  //最前pre   post 后
                        }
                    },

                ],
                exclude: /node_modules/,
                include:path.resolve('src')
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-transform-runtime'
                            ]
                        }
                    },

                ],
                exclude: /node_modules/
            },
            //style-loader css插入head标签中
            //css-loader css解析
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    { loader: 'css-loader' },
                    'postcss-loader',
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