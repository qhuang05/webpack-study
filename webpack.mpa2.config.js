// !多页面打包通用方案
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const setMPA = ()=>{
    const entry = {}, htmlwebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src_mpa/*/index.js'));
    console.log(entryFiles);
    entryFiles.map((item,index) =>{
        const match = item.match(/src_mpa\/(.*)\/index.js$/);
        // console.log(match)
        const pageName = match && match[1];
        entry[pageName] = item;
        htmlwebpackPlugins.push(new HtmlWebpackPlugin({
            template: path.join(__dirname, `./src_mpa/${pageName}/index.html`),
            filename: `${pageName}.html`,
            chunks: [pageName],
            inject: true,
            title: pageName
        }))
    });
    return {
        entry,
        htmlwebpackPlugins
    }
}
const {entry, htmlwebpackPlugins} = setMPA();
// console.log(entry);
// console.log(htmlwebpackPlugins);

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js"
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
                }
            }
        ]
    },
    plugins: [
        ...htmlwebpackPlugins,
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