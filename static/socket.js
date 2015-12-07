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
	document.querySelectorAll('.text')[1].remove();
	document.querySelectorAll('.text')[0].remove();
	if(theOther.offsetWidth == document.body.offsetWidth) {
		theOther.style.height = 0;
	} else {
		theOther.style.width = 0;
	}
	var canvas = document.createElement(canvas);
	canvas.setAttribute('id', 'canvas');
	canvas.setAttribute('width', window.innerWidth);
	canvas.setAttribute('height', window.innerHeight);
	e.currentTarget.appendChild(canvas);
	e.currentTarget.removeEventListener('click', device);
}
function controlHandler () {
	window.addEventListener('deviceorientation', function (e) {
		var data = {x: e.beta, y: e.gamma, z: e.alpha};
		socket.emit('tilt', data);
	});
}
function monitorHandler (target) {
	socket.on('tilt', function (data) {
		var x = data.x;
		var y = data.y;
		var z = data.z > 180 ? data.z - 360 : data.z;
		var rgb = 'rgb(' + math(x) + ', ' + math(y) + ', ' + math(z) + ')';
		target.style.background = rgb;
		console.log(rgb);
	});
	function math (n) {
		return Math.max(Math.min(Math.round((n * 2 + 180) * (255 / 360)), 255), 0);
	}
}