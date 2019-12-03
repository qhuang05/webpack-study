const path = require('path');
const glob = require('glob');

const entryFiles = glob.sync(path.join(__dirname, './src_multi/*/index.js'));
console.log(entryFiles);
entryFiles.map((item,index)=>{
    const entryFile = item;
    item.match()
})