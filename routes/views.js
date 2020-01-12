var express = require('express');
const path = require('path');
var fs = require('fs');


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var html = fs.readFileSync(path.resolve(__dirname, '../views/index.html'), 'utf8');
  res.send(html);
  // let $ = require("jquery")(dom.window);
});


module.exports = router;
