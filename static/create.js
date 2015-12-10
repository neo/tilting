var stage, stageW, stageH, art;
var stroke = 10

function create () {
	stage = new createjs.Stage('canvas');
	stageW = stage.canvas.width;
	stageH = stage.canvas.height;

	var bg = new createjs.Shape();
	bg.graphics.f('#424242').dr(0, 0, stageW, stageH);
	bg.alpha = 0;
	stage.addChild(bg);

	createjs.Ticker.framerate = 60;
	createjs.Ticker.on("tick", stage);
	createjs.Tween.get(bg).to({alpha: 1}, 700);

	lineNum = 10;
	lines = [];
	dx = [];
	dy = [];
	for (var i = 0; i < lineNum; i++) {
		var line = new createjs.Graphics();
		lines.push(line);
		stage.addChild(new createjs.Shape(line));
		line.mt(stageW/2, stageH/2);
		var ratio = i / 10 + 0.1;
		dx.push(new Damp(ratio));
		dy.push(new Damp(ratio));
	}

	stage.update();
}

var cx, cy, tx, ty;
var ratio = 5;

function draw (x, y, z, rgba) {
	if(!art) create();

	for (var i = lines.length - 1; i >= 0; i--) {
		cx = lines[i].command.x;
		cy = lines[i].command.y;
		tx = dy[i].damp(y/ratio);
		ty = dx[i].damp(x/ratio);
		tx = Math.min(Math.max((cx + tx), 0), stageW);
		ty = Math.min(Math.max((cy + ty), 0), stageH);
		lines[i].s(rgba).mt(cx, cy).lt(tx, ty);
	};

	stage.update();
}

var Damp = function(ratio, startValue) {
	this.ratio = ratio ? ratio : .1;
	this.lastValue = startValue ? startValue : 0;
	this.damp = function(targetValue) {
		return this.lastValue = this.lastValue + (targetValue - this.lastValue) * this.ratio;
	}
}