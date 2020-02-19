console.log('hello webpack')

import logo from './images/logo.png'
let img = new Image();
img.src = logo;
let root = document.getElementById('root');
root.appendChild(img);

// import './style/index.scss'
// import './style/index.less'
import './style/index.css'
import './style/a.css'
const fontDiv = document.createElement('div');
fontDiv.innerHTML = '明月几时有，自己抬头瞅';
fontDiv.className = "font-wrap"
root.appendChild(fontDiv);


// consoel.log('sourcemap test...');

// devServer
const axios = require('axios');
axios.get('/api/info').then(res=>{
    console.log('axios', res);
})

// HMR
let btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);
btn.onclick = function(){
    let node = document.createElement('div');
    node.className = 'node';
    node.innerHTML = '我是新增内容';
    document.body.appendChild(node);
}
import counter from './js/counter.js'
import number from './js/number.js'
counter();
number();
if(module.hot){
    module.hot.accept('./js/number.js', function(){
        document.body.removeChild(document.querySelector('#number'));
        number();
    })
}


// babel
// import '@babel/polyfill';   //完整的es新特性库，设置了按需注入useBuiltIns:"usage"后不需要手动引入
const A = new Promise(()=>{});
[1,2,3].map(item=>{
    console.log(item);
});

