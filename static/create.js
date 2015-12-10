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

	art = new createjs.Graphics();
	stage.addChild(new createjs.Shape(art));

	art.ss(stroke, 1, 1).mt(stageW/2, stageH/2);

	stage.update();

	dx = new Damp();
	dy = new Damp();
}

var cx, cy, tx, ty;
var ratio = 5;

function draw (x, y, z, rgba) {
	if(!art) create();
	cx = art.command.x;
	cy = art.command.y;
	x = dx.damp(x / ratio);
	y = dy.damp(y / ratio);
	tx = Math.min(Math.max((cx + y), 0), stageW);
	ty = Math.min(Math.max((cy + x), 0), stageH);
	art.s(rgba).mt(cx, cy).lt(tx, ty);
	stage.update();
}

var Damp = function(ratio, startValue) {
	this.ratio = ratio ? ratio : .1;
	this.lastValue = startValue ? startValue : 0;
	this.damp = function(targetValue) {
		return this.lastValue = this.lastValue + (targetValue - this.lastValue) * this.ratio;
	}
}