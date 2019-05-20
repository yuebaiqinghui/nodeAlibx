$(function () {
    $('.btnEdit').css('display', 'none')
    //模板引擎更新页面
    init()
    //全选全不选
    $('.chkAll').on('click', function () {
        var statu = $(this).prop('checked')
        $('tbody .chkone').prop('checked', statu)
        var allChk = $('tbody .chkone:checked')
        if (allChk.length > 1) {
            $('.btn-dels').fadeIn(500)
        } else {
            $('.btn-dels').fadeOut(500)
        }
    })
    $('tbody').on('click', '.chkone', function () {
        var cnt = $('tbody .chkone').length
        var allChk = $('tbody .chkone:checked')
        if (allChk.length > 1) {
            $('.btn-dels').fadeIn(500)
        } else {
            $('.btn-dels').fadeOut(500)
        }
        if (allChk.length == cnt) {
            $('.chkAll').prop('checked', true)
        } else {
            $('.chkAll').prop('checked', false)
        }
    })
    //批量删除
    $('.btn-dels').on('click',function(){
        // 获取所有被选择的复选框所对应的id
        var allChk = $('tbody .chkone:checked')
        var arr = []
        for(var i=0;i<allChk.length ;i++){
            arr.push(parseInt(allChk[i].dataset['id']))
        }
        console.log(arr)
        $.ajax({
            type: "post",
            url: "/delCategories",
            data: {arr},
            dataType: "json",
            success: function (result) {
                if (result.code == 200) {
                    $('.alert-danger span').text(result.msg)
                    $('.alert-danger').fadeIn(1000).delay(2000).fadeOut(1000)
                    init() //刷新
                } else {
                    $('.alert-danger span').text(result.msg)
                    $('.alert-danger').fadeIn(1000).delay(2000).fadeOut(1000)
                }
            }
        });
    })
    //编辑按钮事件
    $('tbody').on('click', '.btn-edit', function () {
        var data = $(this).data()
        $('#name').val(data.name)
        $('#slug').val(data.slug)
        $('#id').val(data.id)
        $('.btnEdit').css('display', 'block')
        $('.btnAdd').css('display', 'none')
    })
    //编辑提交
    $('.btnEdit').on('click', function () {
        var data = $('form').serialize()
        $.ajax({
            type: "post",
            url: "/updateCategories",
            data: data,
            dataType: "json",
            success: function (result) {
                if (result.code == 200) {
                    $('.alert-danger span').text(result.msg)
                    $('.alert-danger').fadeIn(1000).delay(2000).fadeOut(1000)
                    init() //刷新
                    $('.btnEdit').css('display', 'none')
                    $('.btnAdd').css('display', 'block')
                    $('#name').val('')
                    $('#slug').val('')
                    $('#id').val('')
                } else {
                    $('.alert-danger span').text(result.msg)
                    $('.alert-danger').fadeIn(1000).delay(2000).fadeOut(1000)
                }
            }
        })
    })

    //添加
    $('.btnAdd').on('click', function () {
        var data = $('form').serialize()
        $.ajax({
            type: "post",
            url: "/addCategories",
            data: data,
            dataType: "json",
            success: function (result) {
                if (result.code == 200) {
                    $('.alert-danger span').text(result.msg)
                    $('.alert-danger').fadeIn(1000).delay(2000).fadeOut(1000)
                    init() //刷新
                } else {
                    $('.alert-danger span').text(result.msg)
                    $('.alert-danger').fadeIn(1000).delay(2000).fadeOut(1000)
                }
            }
        })
    })
})


function init() {
    $.ajax({
        type: "get",
        url: "/getCategories",
        dataType: "json",
        success: function (result) {
            // console.log(result)
            var html = template('cateListTemp', {
                list: result
            })
            $('tbody').html(html)
        }
    })
}
//删除
function delCate(id) {
    $.ajax({
        type: "get",
        url: "/delCategoryById",
        data: {id},
        dataType: "json",
        success: function (result) {
            if (result.code == 200) {
                $('.alert-danger span').text(result.msg)
                $('.alert-danger').fadeIn(1000).delay(2000).fadeOut(1000)
                init() //刷新
            } else {
                $('.alert-danger span').text(result.msg)
                $('.alert-danger').fadeIn(1000).delay(2000).fadeOut(1000)
            }
        }
    })
}