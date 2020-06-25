var express = require('express');
const adminController=require('../controllers/admin');
var router = express.Router();

// 移动端首页
router.get('/', adminController.getAllArticle);

router.put('/put', adminController.modifyOneArticle);

router.delete('/delete/:id', adminController.deleteOneArticle);





module.exports=router;