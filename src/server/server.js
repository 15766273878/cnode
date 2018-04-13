const express = require('express');
const bodyParser = require("body-parser");
const session = require('express-session');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:false}));
app.use(session({
    maxAge:10*60*1000,
    name:"tid",
    resave:false,
    saveUninitial:false,
    secret:"hello react cnode"
}))


app.use('/api/user',require('./util/handle.login'))
app.use('/api',require('./util/proxy'))

app.listen(8888,()=>{
    console.log("服务器开启成功！")
})

