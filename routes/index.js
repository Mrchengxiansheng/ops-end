var express = require('express');
var router = express.Router();
const path = require("path")
const articleController=require('../controllers/home');

/* GET Home page. */
router.get('/', articleController.getArticle);

// 请求文章
router.get('/article/*', articleController.getOneArticle);

// 请求图片
router.get('/public/images/*', function (req, res, next) {
  let file = path.join(__dirname, '../public/images/' + req.params[0]);
  res.sendFile(file);
});

// 上传图片
router.post('/post',articleController.addArticle );

module.exports = router;
