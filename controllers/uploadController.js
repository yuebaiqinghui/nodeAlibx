var formidable = require('formidable')
var path = require('path')

module.exports = {
    doUpload(req,res){
        var form = new formidable.IncomingForm()
        form.encoding = 'utf-8'
        form.uploadDir = __dirname + '/../assets/uploads'
        form.keepExtensions = true
        form.parse(req,(err,fileds,files)=>{
            if (err) {
                res.json({
                    code:201,
                    msg:'文件上传失败'
                })
            } else {
                var filename = path.basename(files.img.path)
                res.json({
                    code:200,
                    msg:'文件上传成功',
                    img:filename
                })
            }
        })
    }
}