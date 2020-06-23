var express = require('express');
const articleController=require('../controllers/home');
var router = express.Router();

// 移动端首页
router.get('/', articleController.getArticle);

router.get('/article/*', articleController.getOneArticle);


module.exports=router;