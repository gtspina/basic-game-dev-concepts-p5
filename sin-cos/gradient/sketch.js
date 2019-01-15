const screenSize = {
	width: 500,
	height: 500
};

let angle = 0;

function setup() {
	createCanvas(screenSize.width, screenSize.height);

	let numLines = screenSize.width;

	while(numLines > 0) {
		angle = (angle + 0.6) % 360;
		numLines -= 1;

		const currentRadians = radians(angle);
		const currentSin = sin(angle);

		const currentColor = angle / 360 * 255;

		stroke(currentColor, currentColor, 255, 255);
		line(numLines, 0, numLines, screenSize.height);
	}
}