let screenSize = {
	width: 500,
	height: 500
};

let player = {
	x: screenSize.width / 2,
	y: -50,
	width: 50,
	height: 50,
	radians: 0
};

function setup() {
	createCanvas(screenSize.width, screenSize.height);
}

function draw() {
	clear(0, 0, screenSize.width, screenSize.height);

	background('black');

	player.y += 2;

	fill('blue');
	ellipse(player.x, player.y, player.width, player.height);

	player.radians += .1;

	player.x += sin(player.radians) * 10;

	console.log(player.x, sin(player.radians) * 10);

	if(player.y > 550) {
		player.y = -50;
		player.x = screenSize.width / 2;
		player.radians = 0;
	}
}