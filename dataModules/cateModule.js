var connection = require('./connect')
//获取所有数据
exports.getAllList = callback => {
    var sql = 'select * from categories where id != 1'
    connection.query(sql, (err, results) => {
        if (err) {
            callback(err)
        } else {
            callback(null, results)
        }
    })
}
//编辑操作
exports.updateCategories = (obj, callback) => {
    var sql = 'update categories set slug = ?,name = ? where id = ?'
    connection.query(sql, [obj.slug, obj.name, obj.id], (err, results) => {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}
//添加分类操作
exports.addCategories = (obj, callback) => {
    var sql = 'insert categories values(null,?,?)'
    connection.query(sql, [obj.slug, obj.name], (err, results) => {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}
//删除操作
exports.delCategoryById = (id,callback) => {
    var sql = 'delete from categories where id = ?'
    connection.query(sql,[id],(err,results)=>{
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}
//批量删除
exports.delCategories = (arr,callback) => {
    var sql = 'delete from categories where id in (?)'
    connection.query(sql,[arr],(err,results)=>{
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}