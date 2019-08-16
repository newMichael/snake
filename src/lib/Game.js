export class Game {
	constructor(snake, food, canvas, options = {}) {
		this.snake = snake;
		this.food = food;
		this.canvas = canvas;
		this.gameOver = true;
		this.score = 0;
		this.context = canvas.getContext("2d");
		this.settings = {
			bgColor: 'transparent',
			borderColor: 'black',
			speed: 40,
			scoreElem: options.scoreElem
		}
	}

	previewGame() {
		this.clearCanvas();
		this.drawSnake();
		this.drawFood();
	}

	startGame() {
		this.gameOver = false;
		this.score = 0;
		this.updateDOMScore();
		this.snake.resetCoords();
		this.food.randomlySetFood(this.canvas.width, this.snake);
		this.gameLoop();
	}
	
	handleKeyPress(keyCode) {
		if (this.gameOver) {
			this.startGame();
		} else {
			this.snake.changeDirection(keyCode);
		}
	}

	gameLoop() {
		const self = this;
		setTimeout(function() {
			self.clearCanvas();
			try {
				self.snake.advance(self);
			} catch(e) {
				self.drawSnake();
				self.gameOver = true;
				return;
			}
			self.drawSnake();
			self.drawFood();
			self.gameLoop();
		}, self.settings.speed);
	}

	clearCanvas() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.fillStyle = this.settings.bgColor;
		this.context.strokestyle = this.settings.borderColor;
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawSnake() {
		const self = this;
		this.snake.coords.forEach(function(snakePart) {
			self.context.fillStyle = self.snake.fillColor;
			self.context.strokestyle = self.snake.borderColor;
			self.context.fillRect(snakePart.x, snakePart.y, 10, 10);
			self.context.strokeRect(snakePart.x, snakePart.y, 10, 10);
		});
	}

	drawFood() {
		this.context.fillStyle = this.food.color;
		this.context.fillRect(this.food.coords.x, this.food.coords.y, 10, 10);
	}

	isCollision() {
		const snakeHead = this.snake.coords[0];
		if (snakeHead.x < 0 || snakeHead.x >= this.canvas.width) return true;
		else if (snakeHead.y < 0 || snakeHead.y >= this.canvas.height) return true;
		let headlessSnake = [...this.snake.coords];
		headlessSnake.shift();
		if (headlessSnake.filter(coords => coords.x === snakeHead.x && coords.y === snakeHead.y).length) return true;
		return false;
	}

	handleEatFood() {
		this.score++;
		this.updateDOMScore();
		this.food.randomlySetFood(this.canvas.width, this.snake);
	}

	updateDOMScore() {
		if (this.settings.scoreElem !== undefined) {
			const scoreElem = document.getElementById(this.settings.scoreElem);
			scoreElem.textContent = this.score;
		}
	}
}