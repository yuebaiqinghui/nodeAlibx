var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')
var session = require('express-session')

var app = express()

app.listen('4801',()=>{
    console.log('http://127.0.0.1:4801')
})
//ejs模版引擎设置
app.set('view engine','ejs')
app.set('views',__dirname+'/views')
//静态资源托管
app.use('/assets',express.static('assets'))
//配置session
app.use(session({
    secret:'xjf',//加盐
    resave:false,
    saveUninitialized:false
}))

app.use(bodyParser.urlencoded({extended:false}))

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    // 下面这句话就是配置我允许谁向我发起跨域请求,意思就是告诉浏览器你得将数据给请求者
    // *代表所有源
    // res.header("Access-Control-Allow-Origin","http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    // 下面这个是为了解决在vue中发送跨域请求会请求两次
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

//所有后台请求添加中间件
app.use((req,res,next) => {
    if(req.session.isLogin && req.session.isLogin == 'true' || req.url.indexOf('/admin') == -1 || req.url == '/admin/login'){
        next()
    }else{
        res.redirect('/admin/login')
    }
})


app.use(router)