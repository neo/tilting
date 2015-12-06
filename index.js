var app = require('express')();

app.get('/', function (req, res) {
	res.send('<h1>Hello world</h1>');
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("http://%s:%s", host, port);
});