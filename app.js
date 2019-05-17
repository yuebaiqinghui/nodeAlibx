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

//所有后台请求添加中间件
app.use((req,res,next) => {
    if(req.session.isLogin && req.session.isLogin == 'true' || req.url.indexOf('/admin') == -1 || req.url == '/admin/login'){
        next()
    }else{
        res.redirect('/admin/login')
    }
})


app.use(router)