const screenSize = {
	width: 500,
	height: 500
};

const rect1 = {
	x: 150,
	y: 150,
	width: 50,
	height: 50,
	color: 'blue'
};

const rect2 = {
	x: 0,
	y: 0,
	width: 50,
	height: 50,
	color: 'white'
};


function setup() {
	createCanvas(screenSize.width, screenSize.height);
}

function draw() {
	background('black');

	rect2.color = 'rgb(0,255,0)';
	rect2.x = mouseX;
	rect2.y = mouseY;

	if(hasCollided(rect2, rect1)) {
		rect2.color = 'rgba(0,255,0, 0.25)';
	}

	fill(rect1.color);
	rect(rect1.x, rect1.y, rect1.width, rect1.height);

	fill(rect2.color);
	rect(rect2.x, rect2.y, rect2.width, rect2.height);	
}

/* solution #2 - good */
function hasCollided(rect1, rect2) {
	let x1 = rect1.x < rect2.x + rect2.width;
	let x2 = rect1.x + rect1.width > rect2.x;
	let y1 = rect1.y < rect2.y + rect2.height;
	let y2 = rect1.y + rect1.height > rect2.y;

	return x1 && x2 && y1 && y2;
}

/* solution #1 - bad */
// function hasCollided(rect1, rect2) {
// 	let p1 = rect1.x >= rect2.x
// 		&& rect1.x <= rect2.x + rect2.width
// 		&& rect1.y >= rect2.y
// 		&& rect1.y <= rect2.y + rect2.height;
// 	let p2 = rect1.x + rect1.width >= rect2.x
// 		&& rect1.x + rect1.width <= rect2.x + rect2.width
// 		&& rect1.y >= rect2.y
// 		&& rect1.y <= rect2.y + rect2.height;
// 	let p3 = rect2.x >= rect1.x
// 		&& rect2.x <= rect1.x + rect1.width
// 		&& rect2.y >= rect1.y
// 		&& rect2.y <= rect1.y + rect1.height;
// 	let p4 = rect2.x + rect2.width >= rect1.x
// 		&& rect2.x + rect2.width <= rect1.x + rect1.width
// 		&& rect2.y >= rect1.y
// 		&& rect2.y <= rect1.y + rect1.height;
// 	return p1 || p2 || p3 || p4;
// }
