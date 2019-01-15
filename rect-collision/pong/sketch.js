const screenSize = {
	width: 500,
	height: 500
};

const sounds = {};

const player1 = {};
const player2 = {};
const ball = {};

const gameState = {
	init: 1,
	inGame: 2
};
let currGameState = gameState.init;

const wallLeft = {
	pos: {
		X: 0,
		Y: 10
	},
	width: 2,
	height: 480,
	color: 'red'
};
const wallRight = {
	pos: {
		X: screenSize.width - 2,
		Y: 10
	},
	width: 2,
	height: 480,
	color: 'red'
};

function setup() {
	sounds.lose = loadSound('lose.wav');
	sounds.touch = loadSound('touch.wav');	
	createCanvas(screenSize.width, screenSize.height);

	initPlayer(10, { left: 65, right: 68 }, player1);
	initPlayer(460, { left: 37, right: 39 }, player2);
	initBall(ball, { X: 0, Y: 0 });
}

function draw() {
	background('black');

	if (currGameState == gameState.inGame) {
		moveBall(ball);
		movePlayer(player1, true);
		movePlayer(player2);
	} else {
		waitGameStart();
	}

	drawDashedLine(screenSize.height / 2 - 1);
	drawRect(player1);
	drawRect(player2);
	drawRect(ball);
}

function waitGameStart() {
	textSize(32);
	text('PONG', 20, 50);
	textSize(20);
	text('PRESS SPACE TO START', 20, 80);

	if (keyIsDown(32)) {
		currGameState = gameState.inGame;
	}

	initPlayer(10, { left: 65, right: 68 }, player1);
	initPlayer(460, { left: 37, right: 39 }, player2);
	initBall(ball, { X: 4, Y: 4 });
}

function initPlayer(y, keyCodes, player) {
	player.width = 80;
	player.height = 8;
	player.color = 'rgba(255,255,255, 0.75)';
	player.keyCodes = keyCodes;
	player.pos = {
		Y: y,
		X: (screenSize.width / 2) - (player.width / 2)
	};
}

function movePlayer(player, auto) {
	if (auto) {
		player.pos.X = ball.pos.X - player.width / 2;

		if (player.pos.X < 0) {
			player.pos.X = 0;
		}
		else if (player.pos.X + player.width > screenSize.width) {
			player.pos.X = screenSize.width - player.width;
		}

		return;
	}

	if (keyIsDown(player.keyCodes.left) && player.pos.X > 0) {
		player.pos.X -= 6;
	} else if (keyIsDown(player.keyCodes.right) && player.pos.X + player.width < screenSize.width) {
		player.pos.X += 6;
	}
}

function initBall(ball, vel) {
	ball.width = 15;
	ball.height = 15;
	ball.color = 'rgba(255,255,255, 0.75)';
	ball.pos = {
		X: screenSize.height / 2 - ball.height / 2,
		Y: screenSize.width / 2 - ball.width / 2
	};
	ball.vel = vel;
	ball.invert = false;
	ball.prevPosX = 0;
}

function moveBall(ball) {
	let outsideNegativeY = ball.pos.Y + ball.width < 0;
	let ousidePositiveY = ball.pos.Y > screenSize.height;

	if (outsideNegativeY || ousidePositiveY) {
		sounds.lose.play();

		const mult = [
			-1, 1
		];

		const vel = {
			Y: mult[Math.floor(random(0, 2))] * ball.vel.Y,
			X: mult[Math.floor(random(0, 2))] * ball.vel.X
		};

		initBall(ball, vel);
	}

	if (hasCollided(ball, player1)) {
		if (!ball.hasCollidedPlayer) {
			sounds.touch.play();
			ball.vel.Y = -4;
			ball.hasCollidedPlayer = true;
		}
	} else {
		ball.hasCollidedPlayer = false;
	}

	if (hasCollided(ball, player2)) {
		if (!ball.hasCollidedPlayer) {
			sounds.touch.play();	
			ball.vel.Y = 4;
			ball.hasCollidedPlayer = true;
		}
	} else {
		ball.hasCollidedPlayer = false;
	}

	if (hasCollided(ball, wallRight)) {
		ball.vel.X = Math.abs(ball.vel.X);
	} else if (hasCollided(ball, wallLeft)) {
		ball.vel.X = -Math.abs(ball.vel.X);
	}

	ball.pos.X -= ball.vel.X;
	ball.pos.Y -= ball.vel.Y;
}

function drawRect(obj) {
	fill(obj.color);
	rect(obj.pos.X, obj.pos.Y, obj.width, obj.height);
}

function drawDashedLine(y) {
	let x = 0;

	fill('rgba(255,255,255, 0.75)');

	while (x < screenSize.width) {
		rect(x, y, 10, 2);
		x += 10;
	}
}

function hasCollided(rect1, rect2) {
	let x1 = rect1.pos.X < rect2.pos.X + rect2.width;
	let x2 = rect1.pos.X + rect1.width > rect2.pos.X;
	let y1 = rect1.pos.Y < rect2.pos.Y + rect2.height;
	let y2 = rect1.pos.Y + rect1.height > rect2.pos.Y;

	return x1 && x2 && y1 && y2;
}