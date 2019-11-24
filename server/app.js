const express = require('express')
const app = express();

app.get('/api/info', (req, res)=>{
    res.json({
        name: 'xiaoming'
    })
})

app.listen(9092, ()=>{
    console.log("Listening port 9092")
})