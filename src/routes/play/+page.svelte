<script>
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { onMount, onDestroy } from 'svelte';

	let holderEl;
	let instance;

	onMount(async () => {
		const { default: p5 } = await import('p5');

		let ghost;
		let score = 0;
		const duration = 30;
		let startTime;
		let state = 'start'; // start | play | over
		const spawnEvery = 60;
		let W = 480;
		let H = 360;

		const sketch = (p) => {
			function spawnGhost() {
				ghost = { x: p.random(40, W - 40), y: p.random(40, H - 40) };
			}

			function drawGhost(x, y) {
				p.noStroke();
				p.fill(220, 255, 230);
				p.ellipse(x, y, 60, 60);
				p.fill(20);
				p.ellipse(x - 12, y - 5, 10);
				p.ellipse(x + 12, y - 5, 10);
			}

			p.setup = () => {
				W = holderEl.clientWidth || 480;
				H = W * 0.75;
				const c = p.createCanvas(W, H);
				c.parent(holderEl);
				p.textFont('Phantom Sans');
				spawnGhost();
			};

			p.windowResized = () => {
				W = holderEl.clientWidth || 480;
				H = W * 0.75;
				p.resizeCanvas(W, H);
			};

			p.draw = () => {
				p.background(15, 10, 25);

				if (state === 'start') {
					p.textAlign(p.CENTER, p.CENTER);
					p.fill(255);
					p.textSize(22);
					p.text('Click to start', W / 2, H / 2);
					return;
				}

				if (state === 'over') {
					p.textAlign(p.CENTER, p.CENTER);
					p.fill(255);
					p.textSize(22);
					p.text('Game over\nScore: ' + score + '\nClick to retry', W / 2, H / 2);
					return;
				}

				const elapsed = (p.millis() - startTime) / 1000;
				const timeLeft = Math.max(0, duration - elapsed);
				if (timeLeft <= 0) {
					state = 'over';
					return;
				}

				if (p.frameCount % spawnEvery === 0) spawnGhost();
				drawGhost(ghost.x, ghost.y);

				p.textAlign(p.LEFT, p.TOP);
				p.fill(255);
				p.textSize(16);
				p.text('Score: ' + score, 12, 10);
				p.textAlign(p.RIGHT, p.TOP);
				p.text('Time: ' + Math.ceil(timeLeft), W - 12, 10);
			};

			p.mousePressed = () => {
				if (state === 'start' || state === 'over') {
					state = 'play';
					score = 0;
					startTime = p.millis();
					spawnGhost();
					return;
				}
				if (p.dist(p.mouseX, p.mouseY, ghost.x, ghost.y) < 30) {
					score++;
					spawnGhost();
				}
			};
		};

		instance = new p5(sketch);
	});

	onDestroy(() => {
		instance?.remove();
	});
</script>

<svelte:head>
	<title>Ghost Ship | Play</title>
</svelte:head>

<div class="page">

<SiteHeader />

<main>
	<div class="hero">
		<img src="/media/IMG_0398.png" alt="" />
		<h1>Play an example game</h1>
		<p>Click the ghost before time runs out! This is the base game you'll be trying to make your own version of.</p>
	</div>

	<div class="cabinet">
		<div bind:this={holderEl} id="sketch-holder"></div>
	</div>

	<p class="upsell">Want movement, more enemies, sound, and power-ups? Play the <a href="/demo/">full reference build</a> or learn how it's made in the <a href="/tutorial/">tutorial</a>.</p>
</main>

<SiteFooter />
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
		display: flex;
		flex-direction: column;
	}
	:global(a) {
		color: inherit;
	}


	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: clamp(24px, 6vw, 48px) 18px;
	}
	.hero {
		text-align: center;
		max-width: 520px;
		margin-bottom: 22px;
	}
	.hero img {
		width: 56px;
		height: 56px;
		object-fit: contain;
		margin-bottom: 8px;
	}
	h1 {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1.8rem, 5.5vw, 2.5rem);
		margin: 0 0 8px;
		text-wrap: balance;
	}
	.hero p {
		color: var(--parchment-dim);
		margin: 0;
		font-size: 15px;
	}

	.cabinet {
		background: var(--panel);
		border: 1px solid var(--panel-line);
		border-radius: 14px;
		padding: 14px;
		width: 100%;
		max-width: 520px;
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

	.upsell {
		margin-top: 20px;
		font-size: 13.5px;
		color: var(--parchment-dim);
		text-align: center;
	}
	.upsell a {
		color: var(--pumpkin);
		text-decoration: none;
	}
	.upsell a:hover {
		text-decoration: underline;
	}


</style>
