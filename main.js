var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
	cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame,

	anim,
	
	snowCanvas = document.getElementById("snow"),
	ctx = snowCanvas.getContext("2d"),
	snowCanvasBuffer = null,
	ctxBuffer = null,

	snowCount = 300,

	flakeSize = 0,
	flakeSizeMin = 2,
	flakeSizeMax = 4,

	flakeSpeedMaxX = 0.75,
	flakeSpeedMaxY = 1.5,

	flakes = [];

window.addEventListener("load", init, false);

function init(evt) {
	setTimeout(function() {
		cancelAnimationFrame(anim);
	}, 5000);
	initSnow();
	animateSnow();
}

function initSnow() {

	// Create buffer
	snowCanvasBuffer = document.createElement("canvas");
	ctxBuffer = snowCanvasBuffer.getContext("2d");

	// Draw snow
	for (var i = 0; i < snowCount; i++) {
		var flake = new SnowFlake();

		flake.radius = (Math.floor(Math.random() * flakeSizeMax) + flakeSizeMin) / 2;
		flake.speedX = (Math.random() * flakeSpeedMaxX) + 1;
		flake.speedY = (Math.random() * flakeSpeedMaxY) + 1;
		flake.posX = Math.random() * ctx.canvas.width;
		flake.posY = Math.random() * ctx.canvas.height;

		// Create flake
		ctx.beginPath();
		ctx.arc(flake.posX, flake.posY, flake.radius, 0, Math.PI * 2);

		// Draw flake to canvas
		ctx.fillStyle = "#fff";
		ctx.fill();

		// Add flake to main array
		flakes.push(flake);
	}
}

function animateSnow() {

	// Clean the canvas before re-drawing everything
	// ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);

	ctx.fillStyle = "#ccc";
	ctx.fillRect(0, 0, snowCanvas.width, snowCanvas.height);;

	// Draw all flakes
	for (var i = 0; i < snowCount; i++) {
		var flake = flakes[i];

		// Move flake
		flake.posX += flake.speedX;
		flake.posY += flake.speedY;

		// Create new flake at new location
		ctx.beginPath();
		ctx.arc(flake.posX, flake.posY, flake.radius, 0, Math.PI * 2);

		// Draw new flake to canvas
		ctx.fillStyle = "#fff";
		// ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
		ctx.fill();

		// Recycle flake
		if (flake.posX > ctx.canvas.width) flake.posX = -flake.radius * 2;
		if (flake.posY > ctx.canvas.height) flake.posY = -flake.radius * 2;
	}

	anim = requestAnimationFrame(animateSnow);
}

function SnowFlake() {
	this.speedX = 0;
	this.speedY = 0;
	this.posX = 0;
	this.posY = 0;
	this.radius = 0;
}
