var exphbs = require('express-handlebars'); 
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var index = require('./routes/index');
var mongoose = require('mongoose');

var app = express();

var router = express.Router();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use("/views",  express.static(__dirname + '/public//views'));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));



var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || 'mongodb://localhost/test';
mongoose.connect(mongoURI);



// app.use('/api', router)
app.get('/api/test', index.apitest);
app.get('/api/wikis', index.getWikis);

app.post('/api/createWiki', index.createWiki);
app.post('/api/getPlayer', index.getPlayer);
app.get('*', index.home);


app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});