$(function(){
    var index = location.href.indexOf('?')   //有？说明url有参数
    var routername
    if(index == -1){
        routername = location.href.substring(location.href.lastIndexOf('/')+1)
    }else{
        routername = location.href.substring(location.href.lastIndexOf('/')+1,index)
    }
    //文章菜单判断
    if(routername == 'posts' || routername == 'post-add' || routername == 'categories'){
        $('#menu-posts').addClass('in')
        $('#menu-posts').attr('aria-expanded',true);
    }
    //设置菜单同理
    if(routername == 'navmenus' || routername == 'slides' || routername == 'settings'){
        $('#menu-settings').addClass('in')
        $('#menu-settings').attr('aria-expanded',true);
    }

    $('li').removeClass('active')
    $('#'+routername).addClass('active')
})