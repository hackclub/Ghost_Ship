<script>
	import { onMount, onDestroy } from 'svelte';

	let holderEl;
	let instance;

	onMount(async () => {
		const { default: p5 } = await import('p5');
		const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const sketch = (p) => {
			let W = 640, H = 480;
			let state = 'start'; 
			let entities = [];
			let particles = [];
			let score = 0, lives = 3, highScore = 0;
			const duration = 30;
			let startTime = 0;
			let spawnTimer = 0;
			let frenzyUntil = 0;
			let lightningUntil = 0;
			let nextLightning = 8000 + Math.random() * 6000;
			let shakeUntil = 0;
			let audioCtx = null;

			function loadHighScore() {
				try {
					return parseInt(localStorage.getItem('ghostHuntHighScore') || '0', 10) || 0;
				} catch (e) {
					return 0;
				}
			}
			function saveHighScore(v) {
				try {
					localStorage.setItem('ghostHuntHighScore', String(v));
				} catch (e) {}
			}

			function beep(freq, dur, type, vol) {
				try {
					audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
					const osc = audioCtx.createOscillator();
					const gain = audioCtx.createGain();
					osc.type = type || 'sine';
					osc.frequency.value = freq;
					gain.gain.value = vol || 0.08;
					gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
					osc.connect(gain).connect(audioCtx.destination);
					osc.start();
					osc.stop(audioCtx.currentTime + dur);
				} catch (e) {}
			}
			const sfx = {
				hitGhost: () => beep(520, 0.12, 'triangle'),
				hitPumpkin: () => { beep(340, 0.14, 'triangle'); beep(680, 0.1, 'triangle', 0.05); },
				hitCandy: () => { beep(660, 0.08, 'square', 0.06); beep(880, 0.14, 'square', 0.05); },
				hitBat: () => beep(140, 0.22, 'sawtooth', 0.09),
				start: () => beep(440, 0.1, 'sine'),
				over: () => beep(220, 0.35, 'sine')
			};

			function weightedType() {
				const r = Math.random();
				if (r < 0.55) return 'ghost';
				if (r < 0.78) return 'pumpkin';
				if (r < 0.94) return 'bat';
				return 'candy';
			}

			function spawn() {
				const type = weightedType();
				const margin = 40;
				if (type === 'bat') {
					const fromLeft = Math.random() < 0.5;
					entities.push({
						type: 'bat', r: 18,
						x: fromLeft ? -30 : W + 30, y: 50 + Math.random() * (H - 140),
						vx: (fromLeft ? 1 : -1) * (2.4 + Math.random() * 1.6),
						vy: 0, born: p.millis(), phase: Math.random() * 10
					});
				} else {
					const ttl = type === 'candy' ? 1500 : type === 'pumpkin' ? 2600 : 2200;
					entities.push({
						type,
						r: type === 'pumpkin' ? 24 : type === 'candy' ? 14 : 22,
						x: margin + Math.random() * (W - margin * 2),
						y: 60 + Math.random() * (H - 120),
						vx: (Math.random() - 0.5) * 0.6,
						vy: (Math.random() - 0.5) * 0.6,
						born: p.millis(), ttl, phase: Math.random() * 10
					});
				}
			}

			function burst(x, y, col, n) {
				for (let i = 0; i < n; i++) {
					const a = Math.random() * Math.PI * 2;
					const sp = 1.5 + Math.random() * 2.5;
					particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, col });
				}
			}

			function startGame() {
				state = 'play';
				score = 0; lives = 3;
				entities = []; particles = [];
				startTime = p.millis();
				spawnTimer = 0;
				frenzyUntil = 0;
				sfx.start();
			}

			function endGame() {
				state = 'over';
				if (score > highScore) { highScore = score; saveHighScore(highScore); }
				sfx.over();
			}

			p.setup = () => {
				W = holderEl.clientWidth || 640;
				H = W * 0.75;
				const c = p.createCanvas(W, H);
				c.parent(holderEl);
				p.pixelDensity(Math.min(2, window.devicePixelRatio || 1));
				p.textFont('Phantom Sans');
				highScore = loadHighScore();
			};

			p.windowResized = () => {
				W = holderEl.clientWidth || 640;
				H = W * 0.75;
				p.resizeCanvas(W, H);
			};

			p.mousePressed = () => {
				if (state === 'start') { startGame(); return; }
				if (state === 'over') {
					const by = H * 0.68;
					if (p.mouseY > by - 26 && p.mouseY < by + 26) startGame();
					return;
				}
				for (let i = entities.length - 1; i >= 0; i--) {
					const e = entities[i];
					if (p.dist(p.mouseX, p.mouseY, e.x, e.y) < e.r + 6) {
						if (e.type === 'bat') {
							lives -= 1;
							shakeUntil = p.millis() + 220;
							burst(e.x, e.y, [226, 86, 95], 10);
							sfx.hitBat();
						} else if (e.type === 'candy') {
							score += 40;
							frenzyUntil = p.millis() + 4000;
							burst(e.x, e.y, [255, 209, 102], 14);
							sfx.hitCandy();
						} else if (e.type === 'pumpkin') {
							score += 25;
							burst(e.x, e.y, [255, 143, 63], 12);
							sfx.hitPumpkin();
						} else {
							score += 10;
							burst(e.x, e.y, [143, 214, 176], 10);
							sfx.hitGhost();
						}
						entities.splice(i, 1);
						if (lives <= 0) endGame();
						return;
					}
				}
			};

			p.keyPressed = () => {
				if (state !== 'play') startGame();
			};

			function drawFog(t) {
				p.noStroke();
				const blobs = 4;
				for (let i = 0; i < blobs; i++) {
					const nx = reduceMotion ? i / blobs : p.noise(i * 10, t * 0.00006);
					const x = nx * (W + 300) - 150;
					const y = H * 0.65 + Math.sin(i + t * 0.0002) * 20 * (reduceMotion ? 0 : 1);
					p.fill(60, 48, 80, 16);
					p.ellipse(x, y, 260, 90);
				}
			}

			function drawGhost(e, bob) {
				p.push();
				p.translate(e.x, e.y + bob);
				p.noStroke();
				p.fill(143, 214, 176, 235);
				p.arc(0, 0, e.r * 2, e.r * 2, Math.PI, 0);
				p.rect(-e.r, 0, e.r * 2, e.r * 0.9);
				p.beginShape();
				const n = 5;
				for (let i = 0; i <= n; i++) {
					const x = -e.r + (2 * e.r) * (i / n);
					const y = e.r * 0.9 + (i % 2 === 0 ? e.r * 0.35 : 0);
					p.vertex(x, y);
				}
				p.vertex(e.r, 0);
				p.endShape(p.CLOSE);
				p.fill(30, 22, 40);
				p.ellipse(-e.r * 0.3, -e.r * 0.05, e.r * 0.22);
				p.ellipse(e.r * 0.3, -e.r * 0.05, e.r * 0.22);
				p.pop();
			}

			function drawPumpkin(e) {
				p.push();
				p.translate(e.x, e.y);
				p.noStroke();
				p.fill(255, 143, 63);
				p.ellipse(0, 0, e.r * 2.1, e.r * 1.8);
				p.stroke(214, 104, 36);
				p.strokeWeight(2);
				p.noFill();
				for (let i = -1; i <= 1; i++) p.arc(i * e.r * 0.5, 0, e.r * 0.9, e.r * 1.7, p.HALF_PI, p.PI + p.HALF_PI);
				p.noStroke();
				p.fill(96, 66, 40);
				p.rect(-4, -e.r * 0.95, 8, 10, 2);
				p.pop();
			}

			function drawCandy(e, t) {
				p.push();
				p.translate(e.x, e.y);
				p.rotate(Math.sin(t * 0.01 + e.phase) * 0.3);
				p.noStroke();
				p.fill(255, 209, 102);
				p.ellipse(0, 0, e.r * 2, e.r * 1.3);
				p.triangle(-e.r * 1.1, 0, -e.r * 0.5, -e.r * 0.6, -e.r * 0.5, e.r * 0.6);
				p.triangle(e.r * 1.1, 0, e.r * 0.5, -e.r * 0.6, e.r * 0.5, e.r * 0.6);
				p.pop();
			}

			function drawBat(e, t) {
				p.push();
				p.translate(e.x, e.y);
				const flap = Math.sin(t * 0.02 + e.phase) * 0.8;
				p.noStroke();
				p.fill(226, 86, 95);
				p.ellipse(0, 0, e.r * 1.1, e.r * 0.9);
				p.push(); p.rotate(-0.3 - flap); p.triangle(0, 0, -e.r * 1.6, -e.r * 0.6, -e.r * 0.6, e.r * 0.2); p.pop();
				p.push(); p.rotate(0.3 + flap); p.triangle(0, 0, e.r * 1.6, -e.r * 0.6, e.r * 0.6, e.r * 0.2); p.pop();
				p.pop();
			}

			function drawHUD(timeLeft) {
				p.noStroke();
				p.fill(244, 236, 217);
				p.textFont('Phantom Sans'); p.textSize(15); p.textAlign(p.LEFT, p.TOP);
				p.text('SCORE ' + score, 14, 12);
				p.textAlign(p.RIGHT, p.TOP);
				p.fill(timeLeft < 6 ? [226, 86, 95] : [244, 236, 217]);
				p.text(Math.ceil(timeLeft) + 's', W - 14, 12);
				p.textAlign(p.CENTER, p.TOP);
				p.fill(244, 236, 217);
				let hearts = '';
				for (let i = 0; i < 3; i++) hearts += (i < lives ? '●' : '○') + ' ';
				p.text(hearts, W / 2, 12);
				if (p.millis() < frenzyUntil) {
					p.textAlign(p.CENTER, p.TOP);
					p.fill(255, 209, 102);
					p.textSize(11);
					p.text('FRENZY', W / 2, 32);
				}
			}

			function drawButton(label, y) {
				const w = 168, h = 46;
				const hover = p.mouseX > W / 2 - w / 2 && p.mouseX < W / 2 + w / 2 && p.mouseY > y - h / 2 && p.mouseY < y + h / 2;
				p.noStroke();
				p.fill(hover ? [255, 163, 90] : [255, 143, 63]);
				p.rect(W / 2 - w / 2, y - h / 2, w, h, 999);
				p.fill(20, 14, 10);
				p.textFont('Phantom Sans'); p.textSize(13); p.textAlign(p.CENTER, p.CENTER);
				p.text(label, W / 2, y + 1);
				p.cursor(hover ? p.HAND : p.ARROW);
			}

			p.draw = () => {
				const t = p.millis();
				p.background(14, 10, 21);
				drawFog(t);

				if (!reduceMotion && t > nextLightning) {
					lightningUntil = t + 90;
					nextLightning = t + 9000 + Math.random() * 7000;
				}
				if (t < lightningUntil) {
					p.push(); p.noStroke(); p.fill(255, 255, 255, 26); p.rect(0, 0, W, H); p.pop();
				}

				let shakeX = 0, shakeY = 0;
				if (!reduceMotion && t < shakeUntil) {
					shakeX = (Math.random() - 0.5) * 8;
					shakeY = (Math.random() - 0.5) * 8;
				}
				p.push();
				p.translate(shakeX, shakeY);

				if (state === 'start') {
					p.fill(244, 236, 217);
					p.textFont('Griffy'); p.textSize(Math.min(40, W * 0.09)); p.textAlign(p.CENTER, p.CENTER);
					p.text('Ghost Hunt', W / 2, H * 0.38);
					p.textFont('Phantom Sans'); p.textSize(13); p.fill(184, 171, 153);
					p.text('Click the ghosts. Dodge the bats.', W / 2, H * 0.38 + 34);
					drawButton('CLICK TO START', H * 0.62);
					if (highScore > 0) {
						p.fill(184, 171, 153); p.textFont('Phantom Sans'); p.textSize(11);
						p.text('BEST ' + highScore, W / 2, H * 0.62 + 44);
					}
				} else if (state === 'play') {
					const elapsed = (t - startTime) / 1000;
					const timeLeft = Math.max(0, duration - elapsed);
					const prog = Math.min(1, elapsed / duration);
					const interval = p.lerp(900, 420, prog) * (t < frenzyUntil ? 0.45 : 1);

					spawnTimer -= p.deltaTime;
					if (spawnTimer <= 0) { spawn(); spawnTimer = interval * (0.7 + Math.random() * 0.6); }

					for (let i = entities.length - 1; i >= 0; i--) {
						const e = entities[i];
						if (e.type === 'bat') {
							e.x += e.vx;
							if (e.x < -60 || e.x > W + 60) { entities.splice(i, 1); continue; }
							drawBat(e, t);
						} else {
							const age = t - e.born;
							if (age > e.ttl) { entities.splice(i, 1); continue; }
							const bob = Math.sin(t * 0.004 + e.phase) * 6;
							if (e.type === 'ghost') drawGhost(e, bob);
							else if (e.type === 'pumpkin') drawPumpkin(e);
							else drawCandy(e, t);
						}
					}

					for (let j = particles.length - 1; j >= 0; j--) {
						const pt = particles[j];
						pt.x += pt.vx; pt.y += pt.vy; pt.vy += 0.08; pt.life -= 0.035;
						if (pt.life <= 0) { particles.splice(j, 1); continue; }
						p.noStroke();
						p.fill(pt.col[0], pt.col[1], pt.col[2], pt.life * 255);
						p.ellipse(pt.x, pt.y, 5 * pt.life);
					}

					drawHUD(timeLeft);
					if (timeLeft <= 0) endGame();
				} else {
					p.fill(244, 236, 217);
					p.textFont('Griffy'); p.textSize(Math.min(30, W * 0.07)); p.textAlign(p.CENTER, p.CENTER);
					p.text('Time’s up', W / 2, H * 0.32);
					p.textFont('Phantom Sans'); p.textSize(15);
					p.text('SCORE ' + score, W / 2, H * 0.32 + 34);
					if (score >= highScore && score > 0) {
						p.fill(255, 209, 102); p.textSize(11);
						p.text('NEW BEST', W / 2, H * 0.32 + 56);
					} else {
						p.fill(184, 171, 153); p.textSize(11);
						p.text('BEST ' + highScore, W / 2, H * 0.32 + 56);
					}
					drawButton('PLAY AGAIN', H * 0.68);
				}

				p.pop();
			};
		};

		instance = new p5(sketch);
	});

	onDestroy(() => {
		instance?.remove();
	});
</script>

<svelte:head>
	<title>Ghost Ship | Full Demo</title>
</svelte:head>

<div class="page">

<div class="wrap">
	<div class="topbar">
		<a class="back" href="/">← Ghost Ship kit</a>
		<a class="flag-link" href="https://hackclub.com" target="_blank" rel="noopener">
			<img src="/media/flag-orpheus-pumpkin.svg" alt="Hack Club" />
		</a>
	</div>

	<h1>Ghost Hunt</h1>
	<p class="sub">Click ghosts and pumpkins before the clock runs out. Leave the bats alone: clicking one costs a life. Grab the candy for a scoring frenzy.</p>

	<div class="cabinet">
		<div bind:this={holderEl} id="sketch-holder"></div>
		<div class="legend">
			<div class="item"><span class="dot" style="background:var(--mint)"></span>Ghost · +10</div>
			<div class="item"><span class="dot" style="background:var(--pumpkin)"></span>Pumpkin · +25</div>
			<div class="item"><span class="dot" style="background:var(--candy)"></span>Candy · frenzy</div>
			<div class="item"><span class="dot" style="background:var(--blood)"></span>Bat · avoid (−1 life)</div>
		</div>
	</div>

	<div class="howbuilt">
		<a href="/tutorial/">Learn how this is built: step-by-step tutorial →</a>
	</div>
</div>
</div>

<style>
	:global(:root) {
		--night: #14101c;
		--panel: #1d1728;
		--panel-line: #372c46;
		--parchment: #f4ecd9;
		--parchment-dim: #b8ab99;
		--pumpkin: #ff8f3f;
		--mint: #8fd6b0;
		--blood: #e2565f;
		--candy: #ffd166;
		--font-display: 'Griffy', cursive;
		--font-body: 'Phantom Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
		--font-mono: 'SFMono-Regular', Consolas, monospace;
	}
	:global(*) {
		box-sizing: border-box;
	}
	.page {
		min-height: 100vh;
		min-height: 100dvh;
		margin: 0;
		background: var(--night);
		color: var(--parchment);
		font-family: var(--font-body);
		padding: clamp(18px, 5vw, 48px) 18px 56px;
	}
	.wrap {
		max-width: 720px;
		margin: 0 auto;
	}

	a.back {
		font-family: var(--font-body);
		font-size: 12px;
		letter-spacing: 0.06em;
		color: var(--parchment-dim);
		text-decoration: none;
		text-transform: uppercase;
	}
	a.back:hover {
		color: var(--pumpkin);
	}
	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 18px;
		flex-wrap: wrap;
		gap: 8px;
	}
	.flag-link {
		display: flex;
		align-items: center;
		opacity: 0.7;
	}
	.flag-link:hover {
		opacity: 1;
	}
	.flag-link img {
		height: 34px;
		width: auto;
	}

	h1 {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(2.1rem, 7vw, 3rem);
		margin: 4px 0 6px;
		color: var(--parchment);
		text-wrap: balance;
	}
	p.sub {
		color: var(--parchment-dim);
		margin: 0 0 24px;
		max-width: 56ch;
		font-size: 15px;
	}

	.cabinet {
		background: var(--panel);
		border: 1px solid var(--panel-line);
		border-radius: 14px;
		padding: 14px;
		box-shadow:
			0 0 0 1px rgba(255, 143, 63, 0.06),
			0 24px 60px -20px rgba(0, 0, 0, 0.6);
	}
	#sketch-holder {
		width: 100%;
		aspect-ratio: 4 / 3;
		border-radius: 9px;
		overflow: hidden;
		background: #0e0a15;
		display: block;
	}
	#sketch-holder :global(canvas) {
		display: block;
		width: 100% !important;
		height: 100% !important;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
		margin-top: 16px;
		padding-top: 14px;
		border-top: 1px solid var(--panel-line);
	}
	.legend .item {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 12.5px;
		color: var(--parchment-dim);
	}
	.legend .dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex: none;
	}

	.howbuilt {
		margin-top: 26px;
		text-align: center;
	}
	.howbuilt a {
		display: inline-block;
		font-family: var(--font-body);
		font-size: 12.5px;
		letter-spacing: 0.04em;
		color: var(--parchment);
		border: 1px solid var(--panel-line);
		padding: 9px 16px;
		border-radius: 999px;
		text-decoration: none;
	}
	.howbuilt a:hover {
		border-color: var(--pumpkin);
		color: var(--pumpkin);
	}

	@media (max-width: 420px) {
		.legend {
			gap: 10px 14px;
		}
	}
</style>
