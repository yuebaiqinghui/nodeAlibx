var express = require('express')
var pagesController = require('./controllers/pagesController')
var userController = require('./controllers/userController')
var cateController = require('./controllers/cateController')

var router = express.Router()

//前台页面
router.get('/',pagesController.getIndexPage)
      .get('/detail',pagesController.getDetailPage)
      .get('/list',pagesController.getListPage)

//后台页面
router.get('/admin',pagesController.getAdminPage)
      .get('/admin/categories',pagesController.getCategoriesPage)
      .get('/admin/comments',pagesController.getCommentsPage)
      .get('/admin/login',pagesController.getLoginPage)
      .get('/admin/navmenus',pagesController.getNavmenusPage)
      .get('/admin/passwordreset',pagesController.getPasswordPage)
      .get('/admin/post-add',pagesController.getPostaddPage)
      .get('/admin/posts',pagesController.getPostsPage)
      .get('/admin/profile',pagesController.getProfilePage)
      .get('/admin/settings',pagesController.getSettingsPage)
      .get('/admin/slides',pagesController.getSlidesPage)
      .get('/admin/users',pagesController.getUsersPage)

//用户处理
      .post('/login',userController.login)
//分类管理处理
      .get('/getCategories',cateController.getAllCateList)
      .post('/updateCategories',cateController.updateCategories)
      .post('/addCategories',cateController.addCategories)
      .get('/delCategoryById',cateController.delCategoryById)
      .post('/delCategories',cateController.delCategories)



      
module.exports = router