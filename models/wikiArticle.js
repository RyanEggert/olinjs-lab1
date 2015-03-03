var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
  title: String, // title of article
  content: String // the 'words' of the article
});

module.exports = mongoose.model('article', articleSchema);
