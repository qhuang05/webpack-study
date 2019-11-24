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