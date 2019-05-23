
$(function(){
    //点击实现文件上传
    $('#feature').on('change',function(){
        var file = document.getElementById('feature').files[0]
        var formdata = new FormData()
        formdata.append('img',file)
        $.ajax({
            type: "post",
            url: "/uploadFile",
            data: formdata,
            processData:false,
            contentType:false,
            dataType: "json",
            success: function (result) {
                if(result.code == 200){
                    $('.thumbnail').fadeIn(200).attr('src','/assets/uploads/'+result.img)
                    $('.postimg').val('/assets/uploads/'+result.img)
                }else{
                    $('.alert-danger span').text(result.msg)
                    $('.alert-danger').fadeIn(200).delay(3000).fadeOut(200)
                }
            }
        });
    })

    //富文本编辑器
    CKEDITOR.replace('content')

    //加载分类下拉列表
    ;(function(){
        $.ajax({
            type: "get",
            url: "/getCategories",
            dataType: "json",
            success: function (result) {
                var html = ''
                for(var i=0;i<result.length;i++){
                    html += `<option value="${result[i].id}">${result[i].name}</option>`
                }
                $('.cateSelector').html(html)
            }
        });
    })()

    //新增按钮
    $('.btnsave').on('click',function(){
        CKEDITOR.instances.content.updateElement()
        if (id) {
            opt('/editPostById')
        } else {
            opt('/addPost')
        }
    })

    //实现新增或编辑
    function opt(url){
        $.ajax({
            type: "post",
            url: url,
            data: $('form').serialize(),
            dataType: "json",
            success: function (result) {
                console.log(result)
                if (result.code == 200) {
                    $('.alert-danger span').text(result.msg)
                    $('.alert-danger').fadeIn(100).delay(2000).fadeOut(100)
                    setTimeout(function(){
                        location.href = '/admin/posts'
                    },2200)
                } else {
                    $('.alert-danger span').text(result.msg)
                    $('.alert-danger').fadeIn(200).delay(3000).fadeOut(200)
                }
            }
        });
    }

    var id = xjf.getParameter(location.search).id
    if(id){
        $.ajax({
            type: "get",
            url: "/getPostById",
            data: {id},
            dataType: "json",
            success: function (result) {
                var value = result.data
                // console.log(value)
                $('#title').val(value.title)
                $('#content').val(value.content)
                $('#slug').val(value.slug)
                $('.thumbnail').attr('src',value.feature).show()
                $('.postimg').val(value.feature)
                $('#category').val(value.category_id)
                $('#created').val(value.created)
                $('#status').val(value.status)
                $('#id').val(value.id)

                $('.page-title > h1').text('编辑文章')
                $('.btnsave').val('编辑')
            }
        });
    }
})