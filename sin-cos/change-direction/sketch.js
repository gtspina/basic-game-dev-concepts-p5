let screenSize = {
	width: 500,
	height: 500
};

let angle = 0;
let balls = [];
let colors = [
	'purple',
	'blue',
	'white',
	'darkgreen'
];

function setup() {
	createCanvas(screenSize.width, screenSize.height);

	textSize(30);

	setInterval(insertBall, 50);
}

function draw() {
	clear(0, 0, screenSize.width, screenSize.height);
	background('black');

	fill('red');
	ellipse(screenSize.width / 2, screenSize.height / 2, 5, 5);


	balls.forEach(function (ball) {
		if (ball.active) {
			ball.x += ball.xDirection;
			ball.y += ball.yDirection;

			fill(ball.color);
			ellipse(ball.x, ball.y, 10, 10);

			if(isOutsideScreen(ball)) {
				ball.active = false;
			}
		}
	});

	fill('white');
	text(`angle: ${angle}º`, 20, 480);
}

function insertBall() {
	angle = (angle + 15) % 360;

	let currentRadians = radians(angle);

	let currentCos = cos(currentRadians);
	let currentSin = sin(currentRadians);

	const colorIndex = int(random(0, colors.length));
	const currentColor = colors[colorIndex];

	let ball = {
		active: true,
		color: currentColor,
		width: screenSize.width / 2,
		height: screenSize.height / 2,
		x: 250,
		y: 250,
		xDirection: currentCos,
		yDirection: currentSin
	};

	balls.push(ball);
}

function isOutsideScreen(ball) {
	let outsideInX = ball.x > 550 || ball.x < -50;
	let outsideInY = ball.y > 550 || ball.y < -50;

	return outsideInX || outsideInY;
}
