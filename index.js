var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var conversation = require('./conversation');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, '../fromScratch', 'index.html'));
});

app.post('/msg', urlencodedParser, function(req, res){
    conversation.getMessage(req.body.msg, function(data){
        console.log(data);
        res.send(data);
    });
});

// Listen application request on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});