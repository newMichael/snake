export class Snake {
	constructor(camera) {
		this.coords = [
			{x: 100, y: 150},
			{x: 90, y: 150},
			{x: 80, y: 150},
			{x: 70, y: 150},
			{x: 60, y: 150}
		];
		this.camera = camera;
		this.fillColor = 'lightgreen';
		this.borderColor = 'darkgreen';
		this.vx = 10;
		this.vy = 0;
		this.direction = 'RIGHT';
	}

	resetCoords() {
		this.coords = [
			{x: 250, y: 250},
			{x: 240, y: 250},
			{x: 230, y: 250},
			{x: 220, y: 250},
			{x: 210, y: 250}
		];
		this.vx = 10;
		this.vy = 0;
		this.direction = 'RIGHT';
		this.camera.resetCube();
	}

	advance(game) {
		const newHead = {x: this.coords[0].x + this.vx, y: this.coords[0].y + this.vy};
		this.coords.unshift(newHead);
		this.camera.rotateCube(this.vx, this.vy);

		if (!game.isCollision()) {
			if (newHead.x === game.food.coords.x && newHead.y === game.food.coords.y) {
				game.handleEatFood();
			} else {
				game.snake.coords.pop();
			}
		} else {
			throw ("Collision...");
		}
	}

	changeDirection(keyCode) {
		const keyPressed = keyCode;
		const LEFT_KEY = 37;
		const RIGHT_KEY = 39;
		const UP_KEY = 38;
		const DOWN_KEY = 40;

		if (keyPressed === LEFT_KEY && this.direction !== 'RIGHT') {
			this.vx = -10;
			this.vy = 0;
			this.direction = 'LEFT';
		}
		if (keyPressed === UP_KEY && this.direction !== 'DOWN') {
			this.vx = 0;
			this.vy = -10;
			this.direction = 'UP';
		}
		if (keyPressed === RIGHT_KEY && this.direction !== 'LEFT') {
			this.vx = 10;
			this.vy = 0;
			this.direction = 'RIGHT';
		}
		if (keyPressed === DOWN_KEY && this.direction !== 'UP') {
			this.vx = 0;
			this.vy = 10;
			this.direction = 'DOWN';
		}
	}
}