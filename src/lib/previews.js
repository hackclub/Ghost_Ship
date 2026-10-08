// Live p5.js (instance mode) versions of each Guide step, shown next to its code.
// They mirror the Guide code, so keep them in sync when a step changes.

const NIGHT = [15, 10, 25];

function drawGhost(p, x, y, alpha = 255) {
	p.noStroke();
	p.fill(220, 255, 230, alpha);
	p.ellipse(x, y, 60, 60);
	p.fill(20, 20, 20, alpha);
	p.ellipse(x - 12, y - 5, 10);
	p.ellipse(x + 12, y - 5, 10);
}

function randomSpot(p) {
	return { x: p.random(40, p.width - 40), y: p.random(40, p.height - 40) };
}

function hit(p, ghost) {
	return p.dist(p.mouseX, p.mouseY, ghost.x, ghost.y) < 30;
}

function hud(p, score, timeLeft) {
	p.fill(255);
	p.textSize(16);
	p.textAlign(p.LEFT, p.TOP);
	p.text('Score: ' + score, 12, 10);
	if (timeLeft !== undefined) {
		p.textAlign(p.RIGHT, p.TOP);
		p.text('Time: ' + Math.ceil(timeLeft), p.width - 12, 10);
	}
}

export const starter = (p) => {
	p.setup = () => {
		p.createCanvas(400, 400);
		p.noLoop();
	};
	p.draw = () => p.background(220);
};

export const shapes = (p) => {
	p.setup = () => {
		p.createCanvas(480, 360);
		p.noLoop();
	};
	p.draw = () => {
		p.background(...NIGHT);
		p.noStroke();
		p.fill(255, 240, 200);
		p.ellipse(400, 60, 50, 50);
		p.fill(40, 30, 50);
		p.rect(0, 300, 480, 60);
	};
};

export const creature = (p) => {
	p.setup = () => {
		p.createCanvas(480, 360);
		p.noLoop();
	};
	p.draw = () => {
		p.background(...NIGHT);
		drawGhost(p, 240, 180);
		drawGhost(p, 100, 80);
	};
};

export const drift = (p) => {
	let ghost = { x: 240, y: 180 };
	p.setup = () => p.createCanvas(480, 360);
	p.draw = () => {
		p.background(...NIGHT);
		ghost.x = p.constrain(ghost.x + p.random(-3, 3), 30, p.width - 30);
		ghost.y = p.constrain(ghost.y + p.random(-3, 3), 30, p.height - 30);
		drawGhost(p, ghost.x, ghost.y);
	};
};

export const teleport = (p) => {
	let ghost;
	p.setup = () => {
		p.createCanvas(480, 360);
		ghost = randomSpot(p);
	};
	p.draw = () => {
		p.background(...NIGHT);
		if (p.frameCount % 60 === 0) ghost = randomSpot(p);
		drawGhost(p, ghost.x, ghost.y);
	};
};

export const click = (p) => {
	let ghost;
	let score = 0;
	p.setup = () => {
		const c = p.createCanvas(480, 360);
		ghost = randomSpot(p);
		c.mousePressed(() => {
			if (hit(p, ghost)) {
				score++;
				ghost = randomSpot(p);
			}
		});
	};
	p.draw = () => {
		p.background(...NIGHT);
		if (p.frameCount % 60 === 0) ghost = randomSpot(p);
		drawGhost(p, ghost.x, ghost.y);
		hud(p, score);
	};
};

export const timer = (p) => {
	let ghost;
	let score = 0;
	let startTime;
	p.setup = () => {
		const c = p.createCanvas(480, 360);
		ghost = randomSpot(p);
		startTime = p.millis();
		c.mousePressed(() => {
			if (hit(p, ghost)) {
				score++;
				ghost = randomSpot(p);
			}
		});
	};
	p.draw = () => {
		p.background(...NIGHT);
		let timeLeft = Math.max(0, 30 - (p.millis() - startTime) / 1000);
		if (timeLeft <= 0) {
			startTime = p.millis();
			score = 0;
		}
		if (p.frameCount % 60 === 0) ghost = randomSpot(p);
		drawGhost(p, ghost.x, ghost.y);
		hud(p, score, timeLeft);
	};
};

// The full base game, plus optional extras used by the Toolbox previews.
function game(extra = {}) {
	return (p) => {
		let ghost;
		let score = 0;
		let startTime;
		let state = 'start';
		let particles = [];

		function spawn() {
			ghost = randomSpot(p);
			if (extra.bounce) {
				ghost.vx = p.random(-2, 2);
				ghost.vy = p.random(-2, 2);
			}
		}

		p.setup = () => {
			const c = p.createCanvas(480, 360);
			spawn();
			c.mousePressed(() => {
				if (state !== 'play') {
					state = 'play';
					score = 0;
					startTime = p.millis();
					spawn();
					return;
				}
				if (hit(p, ghost)) {
					score++;
					if (extra.burst) {
						for (let i = 0; i < 10; i++) {
							let a = p.random(p.TWO_PI);
							particles.push({ x: ghost.x, y: ghost.y, vx: Math.cos(a) * 2, vy: Math.sin(a) * 2, life: 1 });
						}
					}
					spawn();
				}
			});
		};

		p.draw = () => {
			p.background(...NIGHT);
			p.textAlign(p.CENTER, p.CENTER);
			p.fill(255);
			p.textSize(22);
			if (state === 'start') {
				p.text('Click to start', p.width / 2, p.height / 2);
				return;
			}
			if (state === 'over') {
				p.text('Game over\nScore: ' + score + '\nClick to retry', p.width / 2, p.height / 2);
				return;
			}

			let elapsed = (p.millis() - startTime) / 1000;
			let timeLeft = Math.max(0, 30 - elapsed);
			if (timeLeft <= 0) {
				state = 'over';
				return;
			}

			let interval = 60;
			if (extra.ramp) interval = Math.floor(p.lerp(60, 20, p.constrain(elapsed / 30, 0, 1)));
			if (p.frameCount % interval === 0) spawn();

			if (extra.wobble) {
				ghost.x += p.random(-2, 2);
				ghost.y += p.random(-2, 2);
			}
			if (extra.bounce) {
				ghost.x += ghost.vx;
				ghost.y += ghost.vy;
				if (ghost.x < 30 || ghost.x > p.width - 30) ghost.vx *= -1;
				if (ghost.y < 30 || ghost.y > p.height - 30) ghost.vy *= -1;
			}

			let alpha = extra.fade ? p.map(Math.sin(p.frameCount * 0.05), -1, 1, 80, 255) : 255;
			drawGhost(p, ghost.x, ghost.y, alpha);

			for (let i = particles.length - 1; i >= 0; i--) {
				let pt = particles[i];
				pt.x += pt.vx;
				pt.y += pt.vy;
				pt.life -= 0.04;
				if (pt.life <= 0) {
					particles.splice(i, 1);
					continue;
				}
				p.noStroke();
				p.fill(220, 255, 230, pt.life * 255);
				p.ellipse(pt.x, pt.y, 5);
			}

			hud(p, score, timeLeft);
		};
	};
}

export const full = game();

export const toolbox = {
	'Haunted wobble': game({ wobble: true }),
	'Floating movement': game({ bounce: true }),
	'See-through ghost': game({ fade: true }),
	'Get harder over time': game({ ramp: true }),
	'Particle burst on a hit': game({ burst: true }),
	'Draw a pumpkin': (p) => {
		p.setup = () => {
			p.createCanvas(480, 360);
			p.noLoop();
		};
		p.draw = () => {
			p.background(...NIGHT);
			p.translate(240, 190);
			p.scale(2.5);
			p.noStroke();
			p.fill(255, 140, 40);
			p.ellipse(0, 0, 64, 52);
			p.fill(60, 140, 60);
			p.rect(-4, -34, 8, 12);
			p.fill(30);
			p.triangle(-16, -4, -8, -12, -2, -4);
			p.triangle(2, -4, 8, -12, 16, -4);
			p.rect(-12, 8, 24, 5);
		};
	}
};
