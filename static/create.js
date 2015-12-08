var stage, stageW, stageH, art;

function canvas () {
	stage = new createjs.Stage('canvas');
	stageW = stage.canvas.width;
	stageH = stage.canvas.height;

	art = new createjs.Graphics();
	stage.addChild(new createjs.Shape(art));

	art.s('#000').mt(stageW/2, stageH/2);

	stage.update();
}

function create (x, y, z, rgba) {
	a = art.command.x + y / 5;
	b = art.command.y + x / 5;
	art.lt(a, b);
	stage.update();
	console.log(rgba);
}