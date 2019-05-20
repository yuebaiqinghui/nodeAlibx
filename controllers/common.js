var http = require('http')
var url = require('url')
module.exports = {
    //获取id
    getParameter(str){
        var obj = url.parse(str,true).query
        return obj
    }
}