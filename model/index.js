const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);
// const ObjectId = mongoose.Schema.Types.ObjectId;

const articleSchema = Schema({
  article_id: Number,
  title: {type: String, default: '你好啊'},
  describe: {type: String, default: '啦啦啦啦啦啦啦啦啦啦啦啦'},
  imgs: [{
    img_id:Number,
    img_url: String
  }
  ]
});
articleSchema.index({ id: 1 });

// const Product = model('Product', productSchema);
// const Manufacturer = model('Manufacturer', manufacturerSchema);
const Article = model('Article', articleSchema);

// Product.findOne((err,data)=>{
//   if(!data){
//     productDate.forEach(item =>{
//       Product.create(item);
//     })
//   }
// })

// module.exports = { Product, Manufacturer, Article };
module.exports = Article;
