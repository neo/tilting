var stage, stageW, stageH, art;
var stroke = 10

function canvas () {
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
}

var cx, cy, tx, ty;
var ratio = 5;

function create (x, y, z, rgba) {
	if(!art) canvas();
	cx = art.command.x;
	cy = art.command.y;
	tx = Math.min(Math.max((cx + y / ratio), 0), stageW);
	ty = Math.min(Math.max((cy + x / ratio), 0), stageH);
	art.s(rgba).mt(cx, cy).lt(tx, ty);
	stage.update();
}