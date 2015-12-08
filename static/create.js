var stage, stageW, stageH, art;

function canvas () {
	stage = new createjs.Stage('canvas');
	stageW = stage.canvas.width;
	stageH = stage.canvas.height;

	art = new createjs.Graphics();
	stage.addChild(new createjs.Shape(art));

	art.ss(10, 1, 1).mt(stageW/2, stageH/2);

	stage.update();
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