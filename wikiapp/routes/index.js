var mongoose = require('mongoose');
var path = require('path');
var wikiArticle = require('./../models/wikiArticle.js');

var index = {};

index.home = function(req, res){
	res.sendfile('./public/views/index.html');
};

// index.newWiki = function(req, res){
// 	res.render("newWiki");
// };


module.exports = index;

