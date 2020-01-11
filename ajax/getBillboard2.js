var $ = jQuery = require('jquery');
var json2html = require('node-json2html');

var getChart = require("billboard-top-100").getChart;

let getBillboard2 = function (req, res) {
    // get Billboard Chart
    getChart('billboard-200', function (err, chart) {
        if (err) console.log(err);
        // set the type of response:
        res.setHeader('Content-Type', 'application/html');

        // var t = {'<>':'div','html':'${rank} ${title} ${artist} ${cover}'};
        var t = {'<>':'div','class':'container billboard' ,'html':[
            {'<>':'div','class':'rank-box','html':'${rank}'},
            {'<>':'div','class':'album-art','html':[{'<>':'img','src':'${cover}'}]},
            {'<>':'div','class':'song-title','html':'${title}'},
            {'<>':'div','class':'artist','html':'${artist}'},
        ]};
            
        var html = json2html.transform(chart.songs,t);

        // console.log(chart.songs[4]);
        // console.log(html);
        res.send(html);

    });

};

module.exports = getBillboard2;
