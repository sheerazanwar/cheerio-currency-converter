var express = require('express')
var app = express()
var request = require("request");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var request = require('request');
var cheerio = require('cheerio');
var port = process.env.PORT || 3000;
app.post('/', function(req,res){
      return new Promise((resolve, reject) => {
          request({
              method: 'GET',
              url: 'http://www.xe.com/currencyconverter/convert/?Amount='+req.body.amount+'&From='+req.body.from+'&To='+req.body.to,
          }, function (err, response, body) {
              var test_if_title = false;
              if (err) return console.error(err);
              var $ = cheerio.load(body);
              var title = $('.wrapper .bodyContent .quickFixesTopModule .uccResultContainer #ucc-container .uccResultAmount').eq(0).text();
              setTimeout(
                  function () {
                      resolve(title);
                  }, 15000);

          });
      }).then(function (a) {
      res.send({result:a});
      });

})

app.listen(port);
