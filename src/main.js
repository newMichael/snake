import {Snake} from './lib/Snake.js';
import {Food} from './lib/Food.js';
//import {Camera} from './lib/Camera.js';
import {Game} from './lib/Game.js';

window.addEventListener('load', function () {
	const food = new Food();
	const canvas = document.getElementById("game-canvas");
	//const camera = new Camera('game-cube', canvas.width);
	const snake = new Snake();
	const options = {
		scoreElem: 'score'
	};
	const game = new Game(snake, food, canvas, options);
	game.clearCanvas();
	document.addEventListener("keydown", function(e) {
		game.handleKeyPress(e.keyCode);
	});
});

window.addEventListener('gameStart', function (e) {
	// e.target matches elem
	console.log(e);
	console.log('start event');
});

window.addEventListener('gameOver', function (e) {
	// e.target matches elem
	console.log(e);
	console.log('end event');
});