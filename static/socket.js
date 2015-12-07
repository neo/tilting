var socket = io();
var control = document.querySelector('.half:first-child');
var monitor = document.querySelector('.half:last-child');
control.addEventListener('click', device);
monitor.addEventListener('click', device);
function device (e) {
	switch (e.currentTarget) {
		case(control):
			controlHandler();
			var theOther = monitor;
			break;
		case(monitor):
			monitorHandler(e.currentTarget);
			var theOther = control;
			break;
	}
	document.querySelectorAll('.text')[0].style.display = 'none';
	document.querySelectorAll('.text')[1].style.display = 'none';
	if(theOther.offsetWidth == document.body.offsetWidth) {
		theOther.style.height = 0;
	} else {
		theOther.style.width = 0;
	}
	e.currentTarget.removeEventListener('click', device);
}
function controlHandler () {
	window.addEventListener('deviceorientation', function (e) {
		var data = {x: e.beta, y: e.gamma, z: e.alpha};
		socket.emit('tilt', data);
	});
	var x, y, z, i;
	x = y = z = 0;
	window.addEventListener('devicemotion', function (e) {
		i = e.interval;
		x += e.acceleration.x * i;
		y += e.acceleration.y * i;
		z += e.acceleration.z * i;
		var data = {x: x, y: y, z: z, i: i};
		socket.emit('wave', data);
	});
}
function monitorHandler (target) {
	socket.on('tilt', function (data) {
		var x = data.x;
		var y = data.y;
		var z = data.z > 180 ? data.z - 360 : data.z;
		var rgb = 'rgb(' + math(x) + ', ' + math(y) + ', ' + math(z) + ')';
		target.style.background = rgb;
		// console.log(rgb);
	});
	function math (n) {
		return Math.max(Math.min(Math.round((n * 2 + 180) * (255 / 360)), 255), 0);
	}
	var x, y, z, i;
	socket.on('wave', function (data) {
		x = data.x;
		y = data.y;
		z = data.z;
		i = data.i;
		console.log(x,y,z,i);
	});
}