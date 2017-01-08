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
			var json_output = [];
			for (i in articles) {
				var new_rss = { 
					"titleText": articles[i]['title'],
					"redirectionUrl": articles[i]['feed']['link']
				}
				json_output.push(new_rss);
			}
			console.log(json_output);
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(json_output));
		}
	});
});

app.listen(PORT, function() {
  console.log("Listening on port " + PORT);
});
