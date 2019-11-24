const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, './dev'),
        filename: "index.js"
    },
    mode: "development",        // 开发模式, "developent"或"production"
}