const screenSize = {
	width: 500,
	height: 500
};

const centerPoint = {
	x: screenSize.width / 2,
	y: screenSize.height / 2
};

const colors = [
	'cyan',
	'purple',
	'darkblue'
];

function setup() {
	createCanvas(screenSize.width, screenSize.height);
	background('black');

	const groups = [];
	let numGroups = 3;
	let distance = 190;

	while (numGroups > 0) {
		let currAngle = 0;		
		const group = [];

		while (currAngle < 405) {
			let currRadians = radians(currAngle);
			let currSin = sin(currRadians);
			let currCos = cos(currRadians);

			let pos = {
				x: centerPoint.x + (currCos * distance),
				y: centerPoint.y + (currSin * distance)
			};

			if (currAngle % 30 == 0) {
				pos = {
					x: centerPoint.x + (currCos * (distance - 10)),
					y: centerPoint.y + (currSin * (distance - 10))
				};
			}
			
			group.push(pos);

			currAngle += 15;
		}

		groups.push(group);

		distance -= 50;
		numGroups -= 1;
	}

	stroke('white');

	groups.forEach((group, indexGroup) => {
		fill(colors[indexGroup]);

		beginShape();
		group.forEach((pos) => {
			curveVertex(pos.x, pos.y);
		});
		endShape();

	});

	fill('red');
	ellipse(centerPoint.x, centerPoint.y, 80, 80);
}

function draw() {

}