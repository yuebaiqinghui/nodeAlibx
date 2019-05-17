$(function(){
    $('.btn-primary').on('click',function(){
        var email = $('#email').val()
        var password = $('#password').val()        //获取用户输入的账号密码

        $.ajax({
            type: "post",
            url: "/login",
            data: {
                email:email,
                password:password
            },
            dataType: "json",
            success: function (results) {
                if(results.code == 201){
                    $('.alert-danger').css('display','block')
                    $('.alert-danger span').text(results.msg)
                }else{
                    location.href = '/admin'
                }
            }
        });
    })
})