var stage, stageW, stageH, art;

function canvas () {
	stage = new createjs.Stage('canvas');
	stageW = stage.canvas.width;
	stageH = stage.canvas.height;

	art = new createjs.Graphics();
	stage.addChild(new createjs.Shape(art));

	art.s('#fff').ss(10, 1, 1).mt(stageW/2, stageH/2);

	stage.update();
}

var cx, cy, tx, ty;
function create (x, y, z, rgba) {
	cx = art.command.x;
	cy = art.command.y;
	tx = cx + y / 5;
	ty = cy + x / 5;
	art.s(rgba).mt(cx, cy).lt(tx, ty);
	stage.update();
}