var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 3000);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/static/index.html');
});

app.use('/static', express.static('static'));

io.on('connection', function (socket) {
	socket.on('init', function (data) {
		socket.broadcast.emit('init', data);
	});
	socket.on('tilt', function (data) {
		socket.broadcast.emit('tilt', data);
	});
	socket.on('pick', function (data) {
		socket.broadcast.emit('pick', data);
	});
});