var mongoose = require('mongoose');
var path = require('path');
var wikiArticle = require('./../models/wikiArticle.js');

var index = {};

index.home = function(req, res){
	res.sendfile('./public/views/index.html');
};

index.apitest = function(req, res){
	res.json({"message": "what is up"})
};

index.createWiki = function(req, res){
	console.log(req.body);
	wiki = req.body;
	var newWiki = new wikiArticle(wiki);
	newWiki.save(function(err){
		if(err){
			console.send(err);
		}
		res.json(newWiki);
	})
};

module.exports = index;

