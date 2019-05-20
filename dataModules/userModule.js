var connection = require('./connect')

exports.getUserByEmail = (email,callback) => {
    var sql = 'select * from users where email = ?'
    connection.query(sql,[email],(err,results)=>{
        if(err){
            callback(err)
        }else{
            callback(null,results[0])
        }
    })
}