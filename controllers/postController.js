var postModule = require('../dataModules/postModule')
var moment = require('moment')
var common = require('./common')
module.exports = {
    getAllPostList(req, res) {
        postModule.getAllPostList(req.query, (err, data) => {
            // console.log(data)
            if (err) {
                res.json({
                    code: 404,
                    msg: 'err'
                })
            } else {
                var arr = data.data
                for (var i = 0; i < arr.length; i++) {
                    arr[i].created = moment(arr[i].created).format('YYYY-MM-DD HH:mm:ss')
                }
                res.json({
                    code: 200,
                    msg: data
                })
            }
        })
    },
    addPost(req, res) {
        var obj = req.body
        obj['views'] = 0
        obj['likes'] = 0
        obj['user_id'] = req.session.currentUser.id
        obj.created = moment(obj.created).format('YYYY-MM-DD HH:mm:ss')
        // console.log(obj)
        postModule.addPost(obj, err => {
            if (err) {
                res.json({
                    code: 201,
                    msg: '新增失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '新增成功'
                })
            }
        })
    },
    getPostById(req, res) {
        var id = req.query.id
        postModule.getPostById(id, (err, data) => {
            if (err) {
                res.json({
                    code: 201,
                    msg: '服务器异常'
                })
            } else {
                data.created = moment(data.created).format('YYYY-MM-DDTHH:mm')
                res.json({
                    code: 200,
                    msg: '获取成功',
                    data: data
                })
            }
        })
    },
    editPostById(req, res) {
        postModule.editPostById(req.body, err => {
            console.log(req.body)
            if (err) {
                res.json({
                    code: 201,
                    msg: '编辑失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '编辑成功'
                })
            }
        })
    },
    delPostById(req, res) {
        var id = common.getParameter(req.url).id
        // console.log(id)
        postModule.delPostById(id, err => {
            if (err) {
                res.json({
                    code: 201,
                    msg: '删除失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '删除成功'
                })
            }
        })
    },
    delPosts(req,res){
        console.log(req.body)
        var arr = req.body['arr[]']
    postModule.delPosts(arr,err=>{
        if (err) {
            res.json({
                code: 201,
                msg: '删除失败'
            })
        } else {
            res.json({
                code: 200,
                msg: '删除成功'
            })
        }
    })
    }
}