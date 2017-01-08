var express = require('express');
var app = express();

var feed_reader = require('feed-read');


var PORT = process.env.PORT || 3000;
var YC_URL = "https://news.ycombinator.com/rss";

app.get('/', function(req, res) {
	res.sendStatus(200);
});

app.get('/rss', function(req, res) {
	feed_reader(YC_URL, function(err, articles) {
		if (err) {
			res.send(err);
		} else {
			res.setHeader('Content-Type', 'application/json');
			var top_story = {
				"titleText": articles[0]['title'],
				"redirectionUrl": articles[0]['feed']['link']
			}
			res.send(JSON.stringify(top_story));
		}
	});
});

app.listen(PORT, function() {
  console.log("Listening on port " + PORT);
});
