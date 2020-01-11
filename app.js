// Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Require jQuery globally
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);

const fs = require("fs");

const path = require('path');

const viewsRouter = require('./routes/views');

const getDate = require('./ajax/getDate');
const getBillboard = require('./ajax/getBillboard');
const getBillboard2 = require('./ajax/getBillboard2');


app.use('/', viewsRouter);
app.use('/public', express.static('public'));
app.use('/data', express.static('data'));

app.get('/ajax-getDate', getDate);
app.get('/ajax-getBillboard', getBillboard);
app.get('/ajax-getBillboard2', getBillboard2);


// for page not found (i.e., 404)
app.use(function (req, res, next) {
  res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
let port = 9000;
app.listen(port, function () {
    console.log('Ajax lab listening on port ' + port + '!');
});

module.exports = app;
