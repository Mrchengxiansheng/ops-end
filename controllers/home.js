const formidable = require("formidable")
const path = require("path")
const basePath = 'D:/VScode/project/ops-back-end/';
const fs = require('fs');
const Article = require('../model/index');

const articleController = {
    async getArticle(req, res) {
        const articleData = await Article.find({});
        // res.set('Cache-Control','public,max-age=300');
        let fistIndex=parseInt(req.query.offset);
        let lastIndex=fistIndex+10;
        let articleDataPart=articleData.slice(fistIndex,lastIndex);
        if((articleDataPart.length+fistIndex) <= articleData.length){
            res.send({
                hasMore:true,
                articleDataPart:articleDataPart
            });
        }else{
            res.send({
                hasMore:false,
                articleDataPart:"没有更多了"
            });
        }
    },

    async getOneArticle(req, res) {
        const oneArticleData = await Article.findOne({article_id : req.params[0]});
        // res.set('Cache-Control','public,max-age=300');
        res.send(oneArticleData);
    },

    addArticle(req, res) {
        const form = formidable({
            multiples: true,
            uploadDir: path.join(basePath, "public/images"),
            keepExtensions: true
        });
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.send(err);
                return;
            }
            console.log('fields:', fields);
            console.log('files:', files);
            let otherData = fields;
            if (Object.keys(files).length > 0) {
                let imgs = [];
                if (Object.keys(files.f1).length === 10) {
                    let extName = '';                      //后缀名
                    switch (files.f1.type) {
                        case 'image/jpg':
                            extName = '.jpg';
                            break;
                        case 'image/png':
                            extName = '.png';
                            break;
                        case 'image/gif':
                            extName = '.gif';
                            break;
                    }
                    let basename = Date.now();
                    let newName = basename + extName;
                    let img_url = `/public/images/${newName}`;
                    let newPath = `D:/VScode/project/ops-back-end/public/images/${newName}`;
                    fs.renameSync(files.f1.path, newPath, err => {
                        if (err) {
                            throw err;
                        }
                    });
                    imgs.push({
                        img_id: 1,
                        img_url: img_url
                    });

                } else {
                    let basename = 0;
                    let newName = '';
                    let img_url = '';
                    let newPath = ''
                    for (let i = 0; i < Object.keys(files.f1).length; i++) {
                        let extName = '';                      //后缀名
                        switch (files.f1[i].type) {
                            case 'image/jpg':
                                extName = '.jpg';
                                break;
                            case 'image/png':
                                extName = '.png';
                                break;
                            case 'image/gif':
                                extName = '.gif';
                                break;
                        }
                        basename = Date.now();
                        newName = basename + extName;
                        img_url = `/public/images/${newName}`;
                        newPath = `D:/VScode/project/ops-back-end/public/images/${newName}`;
                        fs.renameSync(files.f1[i].path, newPath, err => {
                            if (err) {
                                throw err;
                            }
                        });
                        imgs.push({
                            img_id: i,
                            img_url: img_url
                        });

                    }
                }
                Article.count({}, (err, count) => {
                    if (err) {
                        throw err;
                    }
                    let article_id = count + 1;
                    otherData = { 'article_id': article_id, ...otherData, imgs }
                    console.log(otherData);
                    Article.create(otherData);
                    res.send("上传成功");
                });
            }
        });
    }
}

module.exports = articleController;