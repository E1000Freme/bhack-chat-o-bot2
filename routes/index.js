var express = require('express');
var router = express.Router();
var path    = require("path");
var bodyParser = require('body-parser');
var conversation = require('conversation');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'../public/index.html'));
});

router.post('/msg', urlencodedParser, function(req, res){
    conversation.getMessage(req.body.msg, function(data){
        console.log(data);
        res.send(data);
    });
});

module.exports = router;
