var facade = require("../model/Facade");
var express = require('express');
var http = require('http');
var fs = require('fs');

var router = express.Router();

var path = __dirname.substr(0,__dirname.lastIndexOf("\\"));  //Remove the routes part

router.get('/home', function(req, res) {
    res.render('home',{quote: {"quote" : "A clear conscience is usually the sign of a bad memory", "author"  :  "Unknown", category: "general"}});
});

router.get('/user', function(req, res) {
    res.render('signUp');
});

router.get('/login', function(req, res, next) {
    res.render('login', {loginerror : req.session.loginerror});
});

router.get('/documentation', function(req, res, next) {
    res.render('documentation');
});

router.get('/quote', function(req, res, next) {
        res.json(facade.getAllTopics);
});

router.get('/quote/', function(req, res, next){
        res.render('viewquotes');
});

router.get('/quote/:topic', function(req, res) {
    facade.getAllQuotesByTopic(req.params.topic, function(quotes){
        res.json(quotes);
    });
});

router.get('/quote/random/:topic', function(req, res) {
    facade.getRandomQuote(req.params.topic, function(quotes){
        res.json(quotes);
    });
});

router.get('/addquote', function(req, res, next) {
    res.render('addquote');
});

router.get('/rest', function(req, res, next) {
    res.render('rest');
});

var d = '';
// GET Request options configuration
var optionsget = {
    host : 'localhost',
    port : 8080,
    path : '/brandserver/rest/wines', // url with parameters
    method : 'GET' // GET Method
};


module.exports = router;