var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan'); /* Logger */
var fs = require('fs'); /* File I/O */
var rfs = require('rotating-file-stream');
var ejs = require('ejs');   /* Template Engine */
var ejsLocals = require('ejs-locals');   /* ejs-local Engine 추가 */

// ip 체크하여 개발/운영 구분 처리
var ip = require("ip");
//console.log( ip.address() );
if (ip.address().startsWith('192.168.')) {
  process.env.NODE_ENV = 'development';
  //console.log("development");
} else {
  process.env.NODE_ENV = 'production';
  //console.log("production" );
}

var indexRouter = require('./routes/index');

var app = express();
var logDir = path.join(__dirname,'log');

//로그 폴더 확인
fs.existsSync(logDir) || fs.mkdirSync(logDir)

//create a rotating write stream
var logStream = rfs('antman-web.log', {
  interval : '1d',
  path : logDir
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');
app.engine('ejs',ejsLocals);
app.set('view engine', 'ejs');
//app.engine('html', ejs.renderFile);

app.use(logger('combined', {stream : logStream}));
app.use(logger('dev', {stream: process.stdout}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// session setting
app.use(session({
    secret: '@#$theantman$%^',
    resave: false,
    saveUninitialized: true
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("catch 404 error");
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log("Error Handling");
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render 404 error page
  if(err.status == 404) res.render('error404');
  else{
      // render the error page
      res.status(err.status || 500);
      res.render('error');
  }
});

module.exports = app;
