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
        rules: [{
            test: /\.(png|jp?g|gif)$/,
            // use: ["file-loader"]
            use: {
                loader: "file-loader",
                options: {
                    name: "[name]_[hash:8].[ext]",
                    outputPath: 'images/'
                }
            }
        }, {
            test: /\.(ttf|eot|woff|woff2|svg)$/,
            use: ["file-loader"]
        }, {
            test: /\.css$/,
            use: [{
                loader: "style-loader",
                options: {
                    injectType: "singletonStyleTag"
                }
            }, "css-loader", "postcss-loader"],
            // use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
        }, {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
        }, {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name]_[chunkhash:8].css"
        })
    ],
    devServer: {
        contentBase: './dist', 
        open: true,
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://localhost:9092'
            }
        }
    }
}