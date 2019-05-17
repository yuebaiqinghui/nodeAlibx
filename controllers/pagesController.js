var userModules = require('../dataModules/userModule')
//前台页面
exports.getIndexPage = (req,res)=>{
    res.render('index.ejs')
}
exports.getDetailPage = (req,res)=>{
    res.render('detail.ejs')
}
exports.getListPage = (req,res)=>{
    res.render('list.ejs')
}

//后台页面
exports.getAdminPage = (req,res)=>{
    // if(req.session.isLogin && req.session.isLogin == 'true'){
        res.render('admin/index.ejs')
    // }else{
    //     res.redirect('/admin/login')
    // }
    
}
exports.getCategoriesPage = (req,res)=>{
    res.render('admin/categories.ejs')
}
exports.getCommentsPage = (req,res)=>{
    res.render('admin/comments.ejs')
}
exports.getLoginPage = (req,res)=>{
    res.render('admin/login.ejs')
}
exports.getNavmenusPage = (req,res)=>{
    res.render('admin/nav-menus.ejs')
}
exports.getPasswordPage = (req,res)=>{
    res.render('admin/password-reset.ejs')
}
exports.getPostaddPage = (req,res)=>{
    res.render('admin/post-add.ejs')
}
exports.getPostsPage = (req,res)=>{
    res.render('admin/posts.ejs')
}
exports.getProfilePage = (req,res)=>{
    res.render('admin/profile.ejs')
}
exports.getSettingsPage = (req,res)=>{
    res.render('admin/settings.ejs')
}
exports.getSlidesPage = (req,res)=>{
    res.render('admin/slides.ejs')
}
exports.getUsersPage = (req,res)=>{
    res.render('admin/users.ejs')
}