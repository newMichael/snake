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

	getRandomAndUnusedCoords(canvasSize, snake) {
		let rand = this.getRandomCoords(canvasSize);

		while (snake.coords.filter(coord => coord.x === rand[0] && coord.y === rand[1]).length) {
			console.log('redo');
			rand = this.getRandomCoords(canvasSize);
		}
		return rand;
	}

	randomlySetFood(canvasSize, snake) {
		let coords = this.getRandomAndUnusedCoords(canvasSize, snake);
		console.log(coords);
		this.coords.x = coords[0];
		this.coords.y = coords[1];
	}
}