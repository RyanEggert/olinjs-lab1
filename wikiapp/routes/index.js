var mongoose = require('mongoose');
var path = require('path');

var index = {};

index.home = function(req, res){
	res.render("home");
};

index.newWiki = function(req, res){
	res.render("newWiki");
};


module.exports = index;

