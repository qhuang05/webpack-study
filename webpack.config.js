const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.js"
    },
    mode: "development",        // 开发模式，"developent"或"production"
    devtool: "inline-source-map",      // 开启sourcemap，可以快速定位到错误位置
    // !处理模块, loader是有执行顺序的，顺序是自右往左
    module: {
        rules: [
            {
                test: /\.(png|jp?g|gif)$/,
                // use: ["file-loader"]
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name]_[hash:8].[ext]",
                        outputPath: 'images/'
                    }
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use: ["file-loader"]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader",
                    options: {
                        injectType: "singletonStyleTag"
                    }
                }, "css-loader", "postcss-loader"],
                // use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
                // use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
                // use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
            },
            // babel -> 分析依赖 -> AST(抽象语法树) -> 通过语法转换规则转换代码 -> 生成代码
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     // @babel/preset-env将ES6,6,8...等基础特性转化为ES5
                    //     // presets: ['@babel/preset-env'],
                    //     presets: [['@babel/preset-env', {
                    //         targets: {
                    //             edge: "17",
                    //             firefox: "60",
                    //             chrome: "67",
                    //             safari: "11.1"
                    //         },
                    //         corejs: 2,//新版本需要指定核心库版本
                    //         useBuiltIns: "usage"//按需注入
                    //     }]]
                    // }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new CleanWebpackPlugin(),
        // 以独立文件生成.css文件, 而不直接以style形式插入页面
        new MiniCssExtractPlugin({
            filename: "[name]_[chunkhash:8].css"
        })
    ],
    // 基于服务器访问资源, 打包后的模块会放在内存中，速度快，还可以实现热更新
    devServer: {
        contentBase: './dist',
        port: 8081,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:9092'
            }
        },
        // !HMR，热模块替换, (支持css; js需要额外设置)
        // !对于css模块：HMR支持style-loader css处理方式, 不支持抽离成独立文件的方式
        // !对于js模块：HMR需要手动监听需要HMR的模块(module.hot)，当该模块的内容发生改变，会触发回调
        hotOnly: true
    }
}