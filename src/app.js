'use strict';

var express = require('express');
var posts = require('./mock/posts.json');

//turn json object into an array
var postsLists = Object.keys(posts).map(function(value){
	return posts[value];
    }
);

var app = express();
var server = require('http').Server(app);

//Defines middleware- handles request made by client before arriving at route
app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', function(req, res){
	//res.send("<h1>sup yall</h1>");
	var path = req.path;
	res.locals.path = path;
	res.render('index');
});

app.get('/blog/:title?', function(req, res) {
	var title = req.params.title;
	if (title === undefined) {
	    res.status(503);
	    //	    res.send("This page is under construction!");
	    res.render('blog', {posts: postsLists});
	}
	else {
	    var post = posts[title] || {};
	//	res.send(post);
	res.render('post', {post: post});
	}
});

server.listen(process.env.PORT || 3000, function() {
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
