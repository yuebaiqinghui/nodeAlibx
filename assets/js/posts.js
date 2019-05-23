// $(function () {
    var pageSize = 4
    var pageNum = 1
    function initData(query = {}) {
        $.ajax({
            type: "get",
            url: "/getAllPostList",
            data: {
                pageNum,
                pageSize,
                ...query
            },
            dataType: "json",
            success: function (result) {
                console.log(result)
                $('tbody').html(template('postListTemp', {
                    data: result.msg.data
                }))
                if (Math.ceil(result.msg.total / pageSize)) {
                    setPagenav(Math.ceil(result.msg.total / pageSize))
                }
            }
        })
    }
    
    function delCate(id) {
        $.ajax({
            type: "get",
            url: "/delPostById",
            data: {
                id
            },
            dataType: "json",
            success: function (result) {
                if (result.code == 200) {
                    $('.alert-danger span').text(result.msg)
                    $('.alert-danger').fadeIn(1000).delay(1000).fadeOut(1000)
                    setTimeout(function(){
                        initData() //刷新
                    },1200)
                    
                } else {
                    $('.alert-danger span').text(result.msg)
                    $('.alert-danger').fadeIn(1000).delay(2000).fadeOut(1000)
                }
            }
        })
    }
    

    initData()

    //分页
    function setPagenav(total) {
        $('.pagination').bootstrapPaginator({
            bootstrapMajorVersion: 3,
            currentPage: pageNum,
            totalPages: total,
            onPageClicked: function (event, originalEvent, type, page) {
                // console.log(page)
                pageNum = page
                initData()
            }
        })
    }
    //加载分类
    ;
    (function () {
        $.ajax({
            type: "get",
            url: "/getCategories",
            dataType: "json",
            success: function (result) {
                var html = '<option value="all">所有分类</option>'
                for (var i = 0; i < result.length; i++) {
                    html += `<option value="${result[i].id}">${result[i].name}</option>`
                }
                $('.cateSelector').html(html)
            }
        });
    })()

    //点击筛选实现筛选
    $('.btnFilter').on('click', function () {
        var query = {}
        var cate = $('.cateSelector').val()
        var statu = $('.statuSelector').val()
        // console.log(cate,statu)
        if (cate != 'all') {
            query['category_id'] = cate
        }
        if (statu != 'all') {
            query['status'] = statu
        }
        // console.log(query)
        initData(query)
    })

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

    $('.btn-dels').on('click',function(){
        // 获取所有被选择的复选框所对应的id
        var allChk = $('tbody .chkone:checked')
        var arr = []
        for(var i=0;i<allChk.length ;i++){
            arr.push(parseInt(allChk[i].dataset['id']))
        }
        // console.log(arr)
        $.ajax({
            type: "post",
            url: "/delPosts",
            data: {arr},
            dataType: "json",
            success: function (result) {
                if (result.code == 200) {
                    $('.alert-danger span').text(result.msg)
                    $('.alert-danger').fadeIn(1000).delay(2000).fadeOut(1000)
                    initData() //刷新
                } else {
                    $('.alert-danger span').text(result.msg)
                    $('.alert-danger').fadeIn(1000).delay(2000).fadeOut(1000)
                }
            }
        });
    })


// })

