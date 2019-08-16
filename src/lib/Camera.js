export class Camera {
	constructor(id, size) {
		this.elem = document.getElementById(id);
		this.x = size/2;
		this.y = size/2;
		this.xOriginal = size/2;
		this.yOriginal = size/2;
		this.size = size;
	}

	rotateCube(x, y) {
		this.x += x;
		this.y += y;
		let deg = this.calculateDeg();
		this.elem.style.transform="translateZ(-250px) rotateX("+ deg[0] +"deg) rotateY(" + deg[1] + "deg)";
	}

	calculateDeg() {
		const xRatio = (this.x - (this.size/2)) / (this.size/2);
		const yRatio = (this.y - (this.size/2)) / (this.size/2);
		const xDeg = -45 * xRatio;
		const yDeg = 45 * yRatio;
		return [yDeg, xDeg];
	}

	resetCube() {
		this.x = this.xOriginal;
		this.y = this.yOriginal;
	}
}