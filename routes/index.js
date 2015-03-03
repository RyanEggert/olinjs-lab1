var mongoose = require('mongoose');
var path = require('path');
var wikiArticle = require('./../models/wikiArticle.js');

var index = {};

// main page
index.home = function (req, res) {
  res.sendfile('./public/views/index.html');
};

// recieve a greeting from our site
index.apitest = function (req, res) {
  res.json({
    "message": "what is up"
  });
};

// create a new article
index.createWiki = function (req, res) {
  console.log(req.body);
  var wiki = req.body;
  var newWiki = new wikiArticle(wiki);
  newWiki.save(function (err) {
    if (err) {
      console.send(err);
    }
    res.json(newWiki);
  });
};

// get all articles
index.getWikis = function (req, res) {
  wikiArticle.distinct("title")
    .exec(function (err, wikis) {
      if (err) {
        console.log(err);
      }
      res.json(wikis);
    });
};

// find a specific article
index.getPlayer = function (req, res) {
  console.log(req.body);

  wikiArticle.findOne({
    title:  { $regex : new RegExp(req.body.title, "i") }
  }, function (err, wiki) {
    if (err) {
      console.log(err);
    }
    res.json(wiki);
  });
};

// store revised article
index.editWiki = function (req, res) {
  console.log(req.body);
  newWiki = req.body;

  wikiArticle.update({
    title: newWiki.title
  }, newWiki, function (err, wiki) {
    if (err) {
      console.log(err);
    }
    res.json(wiki);
  });
};


module.exports = index;
