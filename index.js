var express = require('express');
var app = express();

var feed = require('feed-read');
var RSS = require('rss');


var PORT = 3000
var YC_URL = "https://news.ycombinator.com/rss"

app.get('/rss', function(req, res) {
	feed(YC_URL, function(err, articles) {
		if (err) throw err;
		var feed = new RSS();
		for (i in articles) {
			c = articles[i];
			feed.item(
			{
				title: c['title'],
				feed_url: c['feed']['link'],
				site_url: c['feed']['source']
			});
		}
		var xml = feed.xml();
		console.log(xml);
		res.send(xml);
	});
});

app.listen(PORT, function() {
  console.log("Listening on port " + PORT);
});
