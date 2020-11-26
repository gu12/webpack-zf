let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require("webpack");
console.log(path.resolve())///Users/zcxiao/Desktop/my_code/webpack-zf 绝对路径
module.exports = {
    devServer: {
        port: 3000,
        contentBase: './build',
        progress: true
    },
    mode: 'development',
    entry: {
        home: './src/index.js',
        other: './src/other.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath:'www.baidu.com'   //统一的资源路径
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
        new CleanWebpackPlugin(),
        new OptimizeCSSAssetsPlugin({}),
        new MiniCssExtractPlugin({
            filename: 'css/main.css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // minify:{
            //     removeAttributeQuotes:true, //去双引号
            //     collapseWhitespace:true,//折叠1行
            // },
            // hash:true
            chunks:['home']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'other.html',
            chunks:['other']
        }),
        new webpack.ProvidePlugin({   //为每个模块注入jquery
            $: 'jquery'
        })
    ],
    externals: {
        // jquery:'jquery'  //这样就不会打包 import xxx from 'xxx' 比如用了cdn
    },
    module: {
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
                            outputPath:'img/',
                            esModule:false,
                            publicPath:'www.bilibi.com'
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
                exclude: /node_modules/
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