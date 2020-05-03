const screenSize = {
	width: 500,
	height: 500
};

let exComplete = false;

const rect1 = {
	pos: { x: 0, y: 0 },
	width: 80,
	height: 80,
	points: ["A", "B", "C", "D"],
	color: 'rgba(234, 26, 26, 0.63)',
	hoverColor: 'rgba(234, 26, 26, 1)',
	getColor: function (collided) {
		return collided ? this.color : this.hoverColor;
	}
};

const rect2 = {
	pos: { x: 150, y: 150 },
	width: 80,
	height: 100,
	points: ["E", "F", "G", "H"],
	color: 'rgba(55, 15, 163, 0.60)',
	hoverColor: 'rgba(55, 15, 163, 1)',
	getColor: function (collided) {
		return collided ? this.color : this.hoverColor;
	}
};


function setup() {
	createCanvas(screenSize.width, screenSize.height);
	exComplete = new URL(window.location).searchParams.get("complete") == "true";
}

function draw() {
	background('white');
	stroke('black');

	rect1.pos.x = mouseX;
	rect1.pos.y = mouseY;

	drawGrid();
	drawRect(rect2, hasCollided(rect1, rect2));
	drawRect(rect1, hasCollided(rect1, rect2));
	drawPoints(rect1, rect2);
}

function drawGrid() {
	let x = 0;
	let y = 0;

	stroke('rgba(0, 0, 0, 0.13)');

	while (y < screenSize.height) {
		line(0, y, screenSize.width, y);
		y += 10;
	}

	while (x < screenSize.width) {
		line(x, 0, x, screenSize.height);
		x += 10;
	}
}

function drawRect(obj, collided) {
	fill(obj.getColor(collided));
	rect(obj.pos.x, obj.pos.y, obj.width, obj.height);

	if (exComplete) {
		drawPoint(getP1PointFormatted(obj), obj.pos.x - 20, obj.pos.y - 5, "black");
		drawPoint(getP2PointFormatted(obj), obj.pos.x + obj.width - 20, obj.pos.y - 5, "black");
		drawPoint(getP3PointFormatted(obj), obj.pos.x - 20, obj.pos.y + obj.height, "black");
		drawPoint(getP4PointFormatted(obj), obj.pos.x + obj.width - 20, obj.pos.y + obj.height, "black");
	} else {
		drawPoint(obj.points[0], obj.pos.x - 5, obj.pos.y - 5, obj.color);
		drawPoint(obj.points[1], obj.pos.x + obj.width - 5, obj.pos.y - 5, obj.color);
		drawPoint(obj.points[2], obj.pos.x - 5, obj.pos.y + obj.height + 17, obj.color);
		drawPoint(obj.points[3], obj.pos.x + obj.width - 5, obj.pos.y + obj.height + 17, obj.color);
	}

}

function drawPoints(rect1, rect2) {
	const checks = [
		{
			collided: hasCollidedAF(rect1, rect2),
			text: hasCollidedAF(rect1, rect2) ? "A está antes que F ✓" : "A está depois que F ✗",
			completeText: hasCollidedAF(rect1, rect2) ? "Ax está antes que Fx ✓" : "Ax está depois que Fx ✗"
		},
		{
			collided: hasCollidedBE(rect1, rect2),
			text: hasCollidedBE(rect1, rect2) ? "B está depois que E ✓" : "B está antes que E ✗",
			completeText: hasCollidedBE(rect1, rect2) ? "Bx está depois que Ex ✓" : "Bx está antes que Ex ✗",
		},
		{
			collided: hasCollidedAG(rect1, rect2),
			text: hasCollidedAG(rect1, rect2) ? "A está acima que G ✓" : "A está abaixo que G ✗",
			completeText: hasCollidedAG(rect1, rect2) ? "Ay está acima que Gy ✓" : "Ay está abaixo que Gy ✗",
		},
		{
			collided: hasCollidedCE(rect1, rect2),
			text: hasCollidedCE(rect1, rect2) ? "C está abaixo que E ✓" : "C está acima que E ✗",
			completeText: hasCollidedCE(rect1, rect2) ? "Cx está abaixo que Ex ✓" : "Cx está acima que Ex ✗",
		},
	];
	let posCheck = {
		x: 20,
		y: 400
	};

	checks.forEach(check => {
		let color = check.collided ? "green" : "rgba(234, 26, 26, 1)";

		fill(color);
		textSize(15);
		textStyle(BOLD);

		text(exComplete ? check.completeText : check.text, posCheck.x, posCheck.y);

		posCheck.y += 20;
	});
}

function drawPoint(point, posX, posY, color) {
	textSize(14);
	textStyle(BOLD);

	fill(color);
	text(point, posX, posY);
}

function getP1Point(obj) {
	return {
		x: obj.pos.x,
		y: obj.pos.y
	};
}

function getP1PointFormatted(obj) {
	const point = getP1Point(obj);
	return `${obj.points[0]}x:${point.x},\n${
		obj.points[0]}y:${point.y}`;
}

function getP2Point(obj) {
	return {
		x: obj.pos.x + obj.width,
		y: obj.pos.y
	};
}

function getP2PointFormatted(obj) {
	const point = getP2Point(obj);
	return `${obj.points[1]}x:${point.x},\n${
		obj.points[1]}y:${point.y}`;
}

function getP3Point(obj) {
	return {
		x: obj.pos.x,
		y: obj.pos.y + obj.height
	};
}

function getP3PointFormatted(obj) {
	const point = getP3Point(obj);
	return `${obj.points[2]}x:${point.x},\n${
		obj.points[2]}y:${point.y}`;
}

function getP4Point(obj) {
	return {
		x: obj.pos.x + obj.width,
		y: obj.pos.y + obj.height
	};
}

function getP4PointFormatted(obj) {
	const point = getP4Point(obj);
	return `${obj.points[3]}x:${point.x},\n${
		obj.points[3]}y:${point.y}`;
}

function hasCollidedAF(rect1, rect2) {
	return rect1.pos.x < rect2.pos.x + rect2.width;
}

function hasCollidedBE(rect1, rect2) {
	return rect1.pos.x + rect1.width > rect2.pos.x;
}

function hasCollidedAG() {
	return rect1.pos.y < rect2.pos.y + rect2.height;
}

function hasCollidedCE() {
	return rect1.pos.y + rect1.height > rect2.pos.y;
}

function hasCollided(rect1, rect2) {
	let x1 = rect1.pos.x < rect2.pos.x + rect2.width;
	let x2 = rect1.pos.x + rect1.width > rect2.pos.x;
	let y1 = rect1.pos.y < rect2.pos.y + rect2.height;
	let y2 = rect1.pos.y + rect1.height > rect2.pos.y;

	return x1 && x2 && y1 && y2;
}
