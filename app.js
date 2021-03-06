const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const mbRouter = require('./routes/mb');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.connect(`mongodb://localhost:27017/ops`);

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  //设置强缓存时间
  res.header('Cache-Control', 'max-age=300'); 
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// const options={
//   etag: false, // 禁用协商缓存
//   lastModified: false, // 禁用协商缓存
//   immutable: true,
//   // maxAge: '5m'
//   setHeaders: (res, path, stat) => {
//     res.set('Cache-Control', 'max-age=300'); // 强缓存超时时间为10秒
//   },
// }
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(path.join(__dirname, 'public/images'),options));

app.use('/', indexRouter);
app.use('/mb', mbRouter);
app.use('/admin',adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
