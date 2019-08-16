export class Food {
	constructor() {
		this.coords = {
			x: 50,
			y: 50
		};
		this.color = 'red';
	}

	getRandomCoords(canvasSize) {
		return [Math.floor(Math.random() * canvasSize/10) * 10, Math.floor(Math.random() * canvasSize/10) * 10];
	}

	getRandomAndUnusedCoords(canvasWidth, canvasHeight, snake) {
		let rand = this.getRandomCoords(canvasWidth, canvasHeight);

		while (snake.coords.filter(coord => coord.x === rand[0] && coord.y === rand[1]).length) {
			rand = this.getRandomCoords(canvasWidth, canvasHeight);
		}
		return rand;
	}

	randomlySetFood(canvasWidth, canvasHeight, snake) {
		let coords = this.getRandomAndUnusedCoords(canvasWidth, canvasHeight, snake);
		this.coords.x = coords[0];
		this.coords.y = coords[1];
	}
}