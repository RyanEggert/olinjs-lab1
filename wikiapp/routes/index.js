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

index.getWikis = function(req, res){

	wikiArticle.find(function(err, wikis){
		if(err){
			console.log(err);
		}
		res.json(wikis)
	});
};

index.getPlayer = function(req, res){
	console.log(req.body);

	wikiArticle.findOne({title: req.body.title}, function(err, wiki){
		if(err){
			console.log(err);
		}
		res.json(wiki)
	});
};

index.editWiki = function(req, res){
	console.log(req.body);
	newWiki = req.body;

	wikiArticle.update({title: newWiki.title}, newWiki, function(err, wiki){
		if(err){
			console.log(err);
		}
		res.json(wiki)
	});
};


module.exports = index;

