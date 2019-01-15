let screenSize = {
	width: 500,
	height: 500
};

let centerPoint = {
	x: screenSize.width / 2,
	y: screenSize.height / 2
};

let angle = 0;
let points = [];
function setup() {
	createCanvas(screenSize.width, screenSize.height);

	textSize(30);

	setInterval(insertPoint, 50);
	stroke('white');
}

function draw() {
	clear(0, 0, screenSize.width, screenSize.height);
	background('black');

	fill('black');

	beginShape();

	points.forEach(function (point) {
		point.x += point.xDirection;
		point.y += point.yDirection;

		curveVertex(point.x, point.y);
	});
	endShape();

	fill('white');
	text(`angle: ${angle}º`, 20, 480);
}

function insertPoint() {
	angle = (angle + 15) % 360;

	let currentRadians = radians(angle);

	let currentCos = cos(currentRadians);
	let currentSin = sin(currentRadians);

	let point = {
		x: centerPoint.x,
		y: centerPoint.y,
		xDirection: currentCos,
		yDirection: currentSin
	};

	points.push(point);
}
