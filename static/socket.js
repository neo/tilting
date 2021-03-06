var socket = io();
var control = document.querySelector('.half:first-child');
var monitor = document.querySelector('.half:last-child');
control.addEventListener('click', device);
monitor.addEventListener('click', device);
function device (e) {
	var target = e.currentTarget;
	switch (target) {
		case(control):
			var handler = controlHandler;
			var theOther = monitor;
			break;
		case(monitor):
			var handler = monitorHandler;
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
	setTimeout(function () {
		canvas = document.createElement('canvas');
		canvas.setAttribute('id', 'canvas');
		canvas.setAttribute('width', window.innerWidth);
		canvas.setAttribute('height', window.innerHeight);
		target.appendChild(canvas);
		handler();
		theOther.style.width = 0;
		theOther.style.height = 0;
	}, 300);
	target.removeEventListener('click', device);
}
function controlHandler () {
	window.addEventListener('deviceorientation', initialOrientation);
	var init, accelerometer;
	function initialOrientation (e) {
		window.removeEventListener('deviceorientation', initialOrientation);
		init = {x: e.beta, y: e.gamma, z: e.alpha};
		socket.emit('init', init);
		if(e.alpha) {
			accelerometer = true;
		} else {
			ctx.save();
			ctx.translate(canvas.width/2,canvas.height/2);
			ctx.font = "48px 'Josefin Sans'";
			ctx.fillStyle = "#fff";
			ctx.textAlign = "center";
			ctx.fillText("Accelerometer not found.", 0, -60);
			ctx.fillText("Please click anywhere to refresh,", 0, 0);
			ctx.fillText("and choose the monitor.", 0, 60);
			canvas.addEventListener('click', function () {
				document.location.reload();
			});
			ctx.restore();
		}
	}
	window.addEventListener('deviceorientation', function (e) {
		var x = e.beta - init.x;
		var y = e.gamma - init.y;
		var z = e.alpha;
		var data = {x: x, y: y, z: z};
		socket.emit('tilt', data);
	});
	// var canvas = document.getElementById('canvas');
	canvas.addEventListener('touchstart', pick);
	canvas.addEventListener('touchmove', pick);
	// canvas.addEventListener('touchend', pick);
	var ctx = canvas.getContext('2d');
	function pick (e) {
		if(e.preventDefault && e.type == 'touchmove') e.preventDefault();
		var x = e.touches[0].clientX;
		var y = e.touches[0].clientY;
		var data = ctx.getImageData(x, y, 1, 1).data;
		var rgba = {r:data[0], g:data[1], b:data[2], a:data[3]/255};
		socket.emit('pick', rgba);
	}
	var img = new Image();
	img.src = 'static/img/color_wheel.jpg';
	img.onload = imgSize;
	function imgSize () {
		var w = canvas.width;
		var h = canvas.height;
		var min = Math.min(w, h);
		// ctx.drawImage(img, (w-min)/2, (h-min)/2, min, min);
		// Anti-aliasing
		ctx.beginPath();
		ctx.arc(w/2, h/2, min/2-5, 0, 2*Math.PI);
		ctx.clip();
	}
	window.addEventListener('resize', function () {
		canvas.setAttribute('width', window.innerWidth);
		canvas.setAttribute('height', window.innerHeight);
		imgSize();
	});
	window.addEventListener('deviceorientation', imgRotate);
	function imgRotate (e) {
		var z = e.alpha;
		var min = Math.min(canvas.width, canvas.height);
		if(z) {
			ctx.clearRect(0,0,canvas.width,canvas.height);
			ctx.save();
			ctx.translate(canvas.width/2,canvas.height/2);
			ctx.rotate(z*Math.PI/180);
			ctx.drawImage(img, -min/2, -min/2, min, min);
			ctx.restore();
		}
	}
}
function monitorHandler () {
	var x, y, z, myInterval;
	var control = false;
	socket.on('init', function (data) {
		control = true;
		create();
	});
	socket.on('tilt', function (data) {
		control = true;
		x = data.x;
		y = data.y;
		z = data.z;
		var rgba = {r:255, g:255, b:255, a:1};
		socket.on('pick', function (data) {
			rgba = data;
		});
		if(!myInterval) {
			myInterval = setInterval(function () {
				draw(x, y, z, rgba);
			}, 10);
		}
	});
	var ctx = canvas.getContext('2d');
	var img = new Image();
	img.src = 'static/img/phone.png';
	img.onload = function () {
		var sx, sy, sw, sh, dx, dy, dw, dh;
		if(canvas.width > 480) {
			sx = sy = 0;
			sw = img.width;
			sh = img.height;
			dh = Math.min(sh, canvas.height / 2);
		} else {
			sx = 40;
			sy = 127.5;
			sw = 400;
			sh = 700;
			dh = Math.min(sh, canvas.height);
		}
		dw = dh * sw / sh;
		dy = (canvas.height - dh) / 2;
		dx = (canvas.width - dw) / 2;
		setTimeout(function () {
			if(!control) ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
		}, 10);
	}
}