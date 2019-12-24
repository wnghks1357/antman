var express = require('express');
var router = express.Router();

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs',
          {title: 'intro',pageTitle: 'intro', node_env:process.env.NODE_ENV}
        );
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard/dashboard_main.ejs',
          {title: 'dashboard',pageTitle: 'dashboard', node_env:process.env.NODE_ENV}
        );
});

router.get('/developTool', function(req, res, next) {
  res.render('developTool/developTool_main.ejs',
          {title: 'developTool',pageTitle: 'developTool', node_env:process.env.NODE_ENV}
        );
});

router.get('/searchLog', function(req, res, next) {
  res.render('searchLog/searchLog_main.ejs',
          {title: '로그조회',pageTitle: '로그조회', node_env:process.env.NODE_ENV}
        );
});

router.get('/setting', function(req, res, next) {
  res.render('setting/setting_main.ejs',
          {title: 'setting',pageTitle: 'setting', node_env:process.env.NODE_ENV}
        );
});

/* 샘플 화면 링크 */
router.get('/sample', function(req, res, next) {
  res.render('sample.ejs',
          {title: '샘플',pageTitle: '샘플', node_env:process.env.NODE_ENV}
        );
});

module.exports = router;
