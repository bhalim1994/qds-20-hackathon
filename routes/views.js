var express = require('express');
const path = require('path');
var fs = require('fs');


var router = express.Router();

// // require json
// var myJSON = require('../data/myJSON');
// var myJSobj = require('../data/myJSobj');

/* GET home page. */
router.get('/test', function(req, res, next) {
  var html = fs.readFileSync(path.resolve(__dirname, '../views/index.html'), 'utf8');
  res.send(html);
  // let $ = require("jquery")(dom.window);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var html = fs.readFileSync(path.resolve(__dirname, '../views/lab.html'), 'utf8');
  res.send(html);
  // let $ = require("jquery")(dom.window);
});

// // get JSON test
// router.get('/JSON', function(req, res, next) {
//   res.send(myJSON.oob);
//   console.log(myJSON.oob);
// });

// // get JS object test
// router.get('/JSobj', function(req, res, next) {
//   res.send(myJSobj.jsobj);
//   console.log(myJSobj.jsobj);
// });


module.exports = router;
