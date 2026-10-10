<script>
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { onMount, onDestroy } from 'svelte';

	let holderEl;
	let instance;

	onMount(async () => {
		const { default: p5 } = await import('p5');

		let bat;
		let score = 0;
		let startTime;
		let state = 'start';
		const stars = [];

		const sketch = (p) => {
			function spawnBat() {
				bat = { x: p.random(60, p.width - 60), y: p.random(60, 260), vx: p.random([-3, 3]) };
			}

			function drawBat(x, y) {
				const flap = Math.sin(p.frameCount * 0.4) * 10;
				p.fill(60, 40, 80);
				p.triangle(x - 8, y, x - 40, y - 15 + flap, x - 30, y + 10);
				p.triangle(x + 8, y, x + 40, y - 15 + flap, x + 30, y + 10);
				p.ellipse(x, y, 30, 26);
				p.fill(255, 80, 80);
				p.circle(x - 6, y - 3, 5);
				p.circle(x + 6, y - 3, 5);
			}

			p.setup = () => {
				const c = p.createCanvas(480, 360);
				c.parent(holderEl);
				for (let i = 0; i < 40; i++) {
					stars.push({ x: p.random(p.width), y: p.random(p.height * 0.7), s: p.random(1, 3) });
				}
				spawnBat();
				c.mousePressed(() => {
					if (state !== 'play') {
						state = 'play';
						score = 0;
						startTime = p.millis();
						spawnBat();
						return;
					}
					if (p.dist(p.mouseX, p.mouseY, bat.x, bat.y) < 30) {
						score++;
						spawnBat();
					}
				});
			};

			p.draw = () => {
				p.background(25, 10, 40);
				p.noStroke();
				p.fill(255, 255, 220);
				for (const st of stars) p.circle(st.x, st.y, st.s);
				p.fill(250, 220, 120);
				p.circle(400, 70, 70);
				p.fill(20, 40, 25);
				p.rect(0, 320, p.width, 40);

				p.fill(255);
				p.textAlign(p.CENTER, p.CENTER);
				p.textFont('Georgia');

				if (state === 'start') {
					p.textSize(30);
					p.text('Bat Catcher', p.width / 2, p.height / 2 - 20);
					p.textSize(16);
					p.text('Click to start', p.width / 2, p.height / 2 + 20);
					return;
				}

				const timeLeft = Math.max(0, 20 - (p.millis() - startTime) / 1000);
				if (state === 'over' || timeLeft <= 0) {
					state = 'over';
					p.textSize(28);
					p.text('Sunrise!', p.width / 2, p.height / 2 - 20);
					p.textSize(16);
					p.text('You caught ' + score + ' bats. Click to retry', p.width / 2, p.height / 2 + 20);
					return;
				}

				bat.x += bat.vx;
				bat.y += Math.sin(p.frameCount * 0.15) * 2;
				if (bat.x < 30 || bat.x > p.width - 30) bat.vx *= -1;
				drawBat(bat.x, bat.y);

				p.textAlign(p.LEFT, p.TOP);
				p.textSize(16);
				p.text('Bats: ' + score, 12, 10);
				p.textAlign(p.RIGHT, p.TOP);
				p.text('Sunrise in ' + Math.ceil(timeLeft), p.width - 12, 10);
			};
		};

		instance = new p5(sketch);
	});

	onDestroy(() => {
		instance?.remove();
	});
</script>

<svelte:head>
	<title>Ghost Ship | Bats!</title>
</svelte:head>

<div class="page">

<SiteHeader />

<main>
	<div class="hero">
		<i class="ph-bold ph-moon-stars bat-icon"></i>
		<h1>Bat Catcher</h1>
		<p>Catch as many flapping bats as you can before sunrise! This is my own take on the guide, and I hopefully made it well :D </p>
	</div>

	<div class="cabinet">
		<div bind:this={holderEl} id="sketch-holder"></div>
	</div>

	<p class="upsell">See the other <a href="/examples/">examples</a>, or learn how to make your own in the <a href="/tutorial/">guide</a>.</p>
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
	.bat-icon {
		font-size: 48px;
		color: var(--pumpkin);
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
