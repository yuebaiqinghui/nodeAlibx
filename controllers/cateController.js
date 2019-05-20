var cateController = require('../dataModules/cateModule')
var common = require('./common')
exports.getAllCateList = (req, res) => {
    cateController.getAllList((err, data) => {
        if (err) {
            res.end('404')
        } else {
            res.json(data)
        }
    })
}

exports.updateCategories = (req, res) => {
    var obj = req.body
    // console.log(obj)
    cateController.updateCategories(obj, err => {
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
}
exports.addCategories = (req,res) => {
    var obj = req.body
    // console.log(obj)
    cateController.addCategories(obj, err => {
        if (err) {
            res.json({
                code: 201,
                msg: '添加失败'
            })
        } else {
            res.json({
                code: 200,
                msg: '添加成功'
            })
        }
    })
}

exports.delCategoryById = (req,res) => {
    var id = common.getParameter(req.url).id
    // console.log(id)
    cateController.delCategoryById(id,err=>{
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
exports.delCategories = (req,res) => {
    var arr = req.body['arr[]']
    // var newArr = arr.map(function(item){
    //     return Number.parseInt(item)
    // })
    cateController.delCategories(arr,err=>{
        // console.log(newArr)
        // console.log(req.body['arr[]'])
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