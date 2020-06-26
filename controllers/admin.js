const formidable = require("formidable")
const path = require("path")
const basePath = 'D:/VScode/project/ops-back-end/';
const fs = require('fs');
const Article = require('../model/index');

const adminController = {
    async getAllArticle(req, res) {
        const articleData = await Article.find({});
        res.send({
            flag: true,
            articleData: articleData
        })
    },

    async deleteOneArticle(req, res) {
        console.log(req.params.id);
        await Article.deleteOne({ article_id: req.params.id });
        res.send("删除成功");
    },

    async modifyOneArticle(req, res) {
        await Article.update({ article_id: req.body.article_id },{imgs: req.body.imgs});
        res.send("修改成功");
    }
    
}
module.exports = adminController;