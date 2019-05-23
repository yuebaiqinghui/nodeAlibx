var connection = require('./connect')

module.exports = {
    getAllPostList(query, callback) {
        var sql = `select posts.id,posts.title,posts.created,posts.status,users.nickname,categories.name cateName
                    from posts
                    inner join users on posts.user_id = users.id
                    inner join categories on posts.category_id = categories.id
                    where 1 = 1 `

        if (query.category_id) {
            sql += "and posts.category_id = " + query.category_id
        }
        if (query.status) {
            sql += `and posts.status = '${query.status}' `
        }
        sql += ` order by created desc
               limit ${(query.pageNum-1)*query.pageSize},${query.pageSize}`
        //    console.log(sql)
        connection.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                sql = 'select count(*) cnt from posts'
                connection.query(sql, (err1, results1) => {
                    if (err1) {
                        callback(err1)
                    } else {
                        // console.log(results1)
                        callback(null, {
                            data: results,
                            total: results1[0].cnt
                        })
                    }
                })

            }
        })
    },
    addPost(obj, callback) {
        var sql = 'insert into posts values(null,?,?,?,?,?,?,?,?,?,?)'
        connection.query(sql, [obj.slug, obj.title, obj.feature, obj.created, obj.content, obj.views, obj.likes, obj.status, obj.user_id, obj.category_id], (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null, results)
            }
        })
    },
    getPostById(id, callback) {
        var sql = `select * from posts where id = ${id}`
        connection.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null, results[0])
            }
        })
    },
    editPostById(obj, callback) {
        console.log(obj)
        var sql = 'update posts set ? where id = ?'
        connection.query(sql, [obj, obj.id], (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null, results)
            }
        })
    },
    delPostById(id, callback) {
        var sql = 'delete from posts where id = ?'
        connection.query(sql, [id], (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    delPosts(arr, callback) {
        console.log(arr)
        var sql = 'delete from posts where id in (?)'
        connection.query(sql, [arr], (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }
}