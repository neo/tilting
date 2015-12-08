var stage, stageW, stageH, art;

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

	art.ss(10, 1, 1).mt(stageW/2, stageH/2);

	stage.update();
	console.log(stage);
}

var cx, cy, tx, ty;
function create (x, y, z, rgba) {
	cx = art.command.x;
	cy = art.command.y;
	tx = Math.min(Math.max((cx + y / 5), 0), stageW);
	ty = Math.min(Math.max((cy + x / 5), 0), stageH);
	art.s(rgba).mt(cx, cy).lt(tx, ty);
	stage.update();
}