<script>
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { SUBMIT_URL } from '$lib/links.js';

	// Which submit instructions step 9 shows.
	let track = $state('workshop');

	const setupCode = String.raw`function setup() {
  createCanvas(400, 400); // make a 400 x 400 pixel canvas
}

function draw() {
  background(220); // paint the whole canvas light gray
}`;

	const shapesCode = String.raw`function setup() {
  createCanvas(480, 360);
}

function draw() {
  background(15, 10, 25);

  noStroke();                // no outlines on the shapes below

  fill(255, 240, 200);       // pale yellow
  ellipse(400, 60, 50, 50);  // a moon: x, y, width, height

  fill(40, 30, 50);          // dark purple
  rect(0, 300, 480, 60);     // the ground: x, y, width, height
}`;

	const ghostCode = String.raw`function draw() {
  background(15, 10, 25);
  drawGhost(240, 180); // draw a ghost in the middle
  drawGhost(100, 80);  // and another one, top left
}

function drawGhost(x, y) {
  noStroke();
  fill(220, 255, 230);       // minty white body
  ellipse(x, y, 60, 60);

  fill(20);                  // almost-black eyes
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);
}`;

	const wobbleCode = String.raw`let ghost = { x: 240, y: 180 };

function draw() {
  background(15, 10, 25);

  ghost.x += random(-3, 3); // drift a little left or right
  ghost.y += random(-3, 3); // drift a little up or down

  drawGhost(ghost.x, ghost.y);
}`;

	const spawnCode = String.raw`let ghost;
let spawnEvery = 60; // frames between jumps (60 frames = about 1 second)

function setup() {
  createCanvas(480, 360);
  spawnGhost();
}

function draw() {
  background(15, 10, 25);
  if (frameCount % spawnEvery === 0) spawnGhost(); // every 60th frame
  drawGhost(ghost.x, ghost.y);
}

function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(40, height - 40) };
}`;

	const clickCode = String.raw`let score = 0;

function mousePressed() {
  // how far was the click from the ghost's center?
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;       // hit! add a point
    spawnGhost();  // and move the ghost somewhere new
  }
}

// at the end of draw():
fill(255);
textSize(16);
text('Score: ' + score, 12, 26);`;

	const timerCode = String.raw`let duration = 30; // seconds per round
let startTime;

// in setup():
startTime = millis();

// in draw(), before drawing the ghost:
let elapsed = (millis() - startTime) / 1000;
let timeLeft = max(0, duration - elapsed);

textAlign(RIGHT, TOP);
text('Time: ' + ceil(timeLeft), width - 12, 10);`;

	const finalCode = String.raw`let ghost;
let score = 0;
let duration = 30;
let startTime;
let state = 'start'; // 'start' | 'play' | 'over'
let spawnEvery = 60;

function setup() {
  createCanvas(480, 360);
  spawnGhost();
}

function draw() {
  background(15, 10, 25);

  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Click to start', width / 2, height / 2);
    return;
  }

  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Game over\nScore: ' + score + '\nClick to retry', width / 2, height / 2);
    return;
  }

  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) {
    state = 'over';
    return;
  }

  if (frameCount % spawnEvery === 0) spawnGhost();
  drawGhost(ghost.x, ghost.y);

  textAlign(LEFT, TOP);
  fill(255);
  textSize(16);
  text('Score: ' + score, 12, 10);
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);
}

function mousePressed() {
  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnGhost();
    return;
  }
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;
    spawnGhost();
  }
}

function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(40, height - 40) };
}

function drawGhost(x, y) {
  noStroke();
  fill(220, 255, 230);
  ellipse(x, y, 60, 60);
  fill(20);
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);
}`;

	const toolbox = [
		{
			id: 'wobble',
			title: 'Haunted wobble',
			time: '~5 min',
			desc: 'Make the ghost shiver in place while it waits to be clicked.',
			code: String.raw`// in draw(), just before drawGhost():
ghost.x += random(-2, 2);
ghost.y += random(-2, 2);`
		},
		{
			id: 'bounce',
			title: 'Floating movement',
			time: '~10 min',
			desc: 'Give the ghost a speed and bounce it off the walls instead of sitting still.',
			code: String.raw`// in spawnGhost(), after making the ghost:
ghost.vx = random(-2, 2);
ghost.vy = random(-2, 2);

// in draw(), before drawGhost():
ghost.x += ghost.vx;
ghost.y += ghost.vy;
if (ghost.x < 30 || ghost.x > width - 30) ghost.vx *= -1;
if (ghost.y < 30 || ghost.y > height - 30) ghost.vy *= -1;`
		},
		{
			id: 'pumpkin',
			title: 'Draw a pumpkin',
			time: '~10 min',
			desc: 'A second thing to draw. Swap it in for the ghost, or use it as a bonus target.',
			code: String.raw`function drawPumpkin(x, y) {
  noStroke();
  fill(255, 140, 40);          // orange body
  ellipse(x, y, 64, 52);
  fill(60, 140, 60);           // green stem
  rect(x - 4, y - 34, 8, 12);
  fill(30);                    // spooky face
  triangle(x - 16, y - 4, x - 8, y - 12, x - 2, y - 4);
  triangle(x + 2, y - 4, x + 8, y - 12, x + 16, y - 4);
  rect(x - 12, y + 8, 24, 5);
}`
		},
		{
			id: 'fade',
			title: 'See-through ghost',
			time: '~5 min',
			desc: 'A fourth number in fill() is transparency. Make the ghost fade in and out.',
			code: String.raw`// in drawGhost(), replace the body fill with:
let alpha = map(sin(frameCount * 0.05), -1, 1, 80, 255);
fill(220, 255, 230, alpha);`
		},
		{
			id: 'ramp',
			title: 'Get harder over time',
			time: '~10 min',
			desc: 'Shrink the time between jumps as the round goes on.',
			code: String.raw`// in draw(), replacing the fixed spawnEvery check:
let progress = constrain(elapsed / duration, 0, 1);
let interval = floor(lerp(60, 20, progress)); // 60 frames → 20 frames
if (frameCount % interval === 0) spawnGhost();`
		},
		{
			id: 'burst',
			title: 'Particle burst on a hit',
			time: '~15 min',
			desc: 'Tiny dots fly out from the ghost when you catch it, then fade away.',
			code: String.raw`let particles = [];

function burst(x, y) {
  for (let i = 0; i < 10; i++) {
    let a = random(TWO_PI);
    particles.push({ x: x, y: y, vx: cos(a) * 2, vy: sin(a) * 2, life: 1 });
  }
}

// call burst(ghost.x, ghost.y) on a hit, then in draw():
for (let i = particles.length - 1; i >= 0; i--) {
  let pt = particles[i];
  pt.x += pt.vx;
  pt.y += pt.vy;
  pt.life -= 0.04;
  if (pt.life <= 0) { particles.splice(i, 1); continue; }
  noStroke();
  fill(220, 255, 230, pt.life * 255);
  ellipse(pt.x, pt.y, 5);
}`
		}
	];
</script>

{#snippet code(id, src)}
	<pre class="code-block">{src}</pre>
{/snippet}

<svelte:head>
	<title>Ghost Ship | Guide</title>
</svelte:head>

<div class="page">

<SiteHeader current="guide" />

<main>
	<header class="intro">
		<p class="eyebrow">Guide</p>
		<h1>Get started with p5.js</h1>
		<p class="lead">This guide assumes you've never used p5.js. You'll learn how drawing works, draw your own ghost, make it move, and finish with <a href="/play/">Ghost Hunt</a>: the same base game everyone starts from.</p>
		<div class="facts">
			<span><b>Needs:</b> a browser</span>
			<span><b>Language:</b> JavaScript</span>
			<span><b>Time:</b> ~30 min for the base game</span>
		</div>
	</header>

	<nav class="toc">
		<span class="label">On this page</span>
		<ol>
			<li><a href="#what">What is p5.js?</a></li>
			<li><a href="#draw">Draw shapes</a></li>
			<li><a href="#ghost">Draw your ghost</a></li>
			<li><a href="#move">Make it move randomly</a></li>
			<li><a href="#click">Click to score</a></li>
			<li><a href="#timer">Add a timer</a></li>
			<li><a href="#together">Put it together</a></li>
			<li><a href="#toolbox">Toolbox: make it yours</a></li>
			<li><a href="#checklist">Checklist &amp; submit</a></li>
		</ol>
	</nav>

	<section class="step" id="what">
		<h2><span class="num">1</span>What is p5.js?</h2>
		<p>p5.js is a JavaScript library for drawing and animating in the browser. You get a <b>canvas</b>, a rectangle of pixels, and simple functions like <code>ellipse()</code> and <code>rect()</code> to draw on it.</p>
		<p>Every p5.js sketch has two special functions:</p>
		<ul>
			<li><code>setup()</code> runs <b>once</b> when the sketch starts. Make the canvas here.</li>
			<li><code>draw()</code> runs <b>again and again</b>, about 60 times a second. Each run is one frame, like a page in a flipbook.</li>
		</ul>
		<p>Open <a href="https://editor.p5js.org/" target="_blank" rel="noopener">editor.p5js.org</a>. It already starts you with this code:</p>
		{@render code('setup', setupCode)}
		<p>Here's what each line does:</p>
		<ul>
			<li><code>createCanvas(400, 400)</code> makes the drawing area: 400 pixels wide, 400 pixels tall. It's in <code>setup()</code> because you only need one canvas.</li>
			<li><code>background(220)</code> paints the whole canvas one color. With a single number, it's a shade of gray: <code>0</code> is black, <code>255</code> is white, so <code>220</code> is light gray. It's in <code>draw()</code> so every frame starts from a clean canvas.</li>
		</ul>
		<div class="note"><i class="ph-bold ph-play"></i><span>Press the ▶ Play button. You'll see a light gray square: that's your game screen.</span></div>
		<div class="callout">
			<h3>How positions work</h3>
			<p>Every point on the canvas is an <b>(x, y)</b> pair. <code>(0, 0)</code> is the <b>top-left</b> corner. <b>x</b> grows to the right, <b>y</b> grows <b>downward</b>. On a 400 × 400 canvas, the middle is <code>(200, 200)</code>. Inside your sketch, <code>width</code> and <code>height</code> hold those sizes for you.</p>
		</div>
	</section>

	<section class="step" id="draw">
		<h2><span class="num">2</span>Draw shapes</h2>
		<p>First, set up the game screen: change the canvas to <code>createCanvas(480, 360)</code> (wider, like a game) and the background to <code>background(15, 10, 25)</code> (dark purple, for a spooky night). The rest of the guide uses these values.</p>
		<p>Drawing in p5.js works like painting: pick a color, then draw a shape with it. Shapes drawn later go on top.</p>
		<ul>
			<li><code>background(r, g, b)</code> fills the whole canvas. Calling it at the start of <code>draw()</code> wipes the last frame.</li>
			<li><code>fill(r, g, b)</code> sets the color for the next shapes. Each number is 0-255: red, green, blue.</li>
			<li><code>noStroke()</code> turns off outlines.</li>
			<li><code>ellipse(x, y, w, h)</code> draws a circle or oval centered at (x, y).</li>
			<li><code>rect(x, y, w, h)</code> draws a rectangle from its top-left corner.</li>
		</ul>
		{@render code('shapes', shapesCode)}
		<div class="note"><i class="ph-bold ph-lightbulb"></i><span><b>Try it:</b> move the moon by changing <code>400, 60</code>. Change the fill numbers to make a blood-red moon.</span></div>
	</section>

	<section class="step" id="ghost">
		<h2><span class="num">3</span>Draw your ghost</h2>
		<p>Now make a drawing of your own. Put the drawing inside a <b>function</b> with <code>x</code> and <code>y</code> parameters. Then you can draw the ghost anywhere, as many times as you want, with one line.</p>
		<p>Every shape inside uses <code>x</code> and <code>y</code> as its starting point, so the eyes move with the body.</p>
		{@render code('ghost', ghostCode)}
		<div class="note"><i class="ph-bold ph-paint-brush"></i><span><b>Your turn:</b> make it yours. Add a mouth with another <code>ellipse()</code>, give it a hat with <code>rect()</code>, or change its color. Keep the body about 60 pixels wide: the click check later expects that.</span></div>
	</section>

	<section class="step" id="move">
		<h2><span class="num">4</span>Make it move randomly</h2>
		<p><code>random(a, b)</code> gives you a different number between <code>a</code> and <code>b</code> every time you call it. That's the key to anything unpredictable.</p>
		<p>First, store the ghost's position in a <b>variable</b> so it can change between frames. <code>{'{ x: 240, y: 180 }'}</code> is an <b>object</b>: one variable holding both numbers.</p>
		<h3>Option A: haunted drift</h3>
		<p>Nudge the ghost a random amount every frame. It shivers and wanders around like it's possessed.</p>
		{@render code('wobble', wobbleCode)}
		<h3>Option B: teleport</h3>
		<p>This is what Ghost Hunt does. Every 60 frames (about one second), the ghost jumps to a random spot. <code>frameCount</code> counts frames since the start, and <code>%</code> gives the remainder of a division, so <code>frameCount % 60 === 0</code> is true once every 60 frames.</p>
		{@render code('spawn', spawnCode)}
		<div class="note"><i class="ph-bold ph-lightbulb"></i><span>The <code>40</code> and <code>width - 40</code> keep the ghost from spawning half off the edge. Keep your <code>drawGhost()</code> function from step 3 at the bottom of the file.</span></div>
	</section>

	<section class="step" id="click">
		<h2><span class="num">5</span>Click to score</h2>
		<p>p5.js calls <code>mousePressed()</code> every time you click. <code>mouseX</code> and <code>mouseY</code> hold where the click happened.</p>
		<p><code>dist()</code> measures the distance between two points. The ghost is 60 pixels wide, so its radius is 30: a click closer than 30 pixels to its center is a hit. An <code>if</code> statement runs code only when that's true.</p>
		{@render code('click', clickCode)}
		<div class="note"><i class="ph-bold ph-cursor-click"></i><span><b>Try it:</b> click the ghost a few times. The score goes up and the ghost jumps somewhere new.</span></div>
	</section>

	<section class="step" id="timer">
		<h2><span class="num">6</span>Add a timer</h2>
		<p><code>millis()</code> is how many milliseconds have passed since the sketch started (1000 ms = 1 second). Save it when the round begins, and subtract to see how long the round has lasted.</p>
		{@render code('timer', timerCode)}
	</section>

	<section class="step" id="together">
		<h2><span class="num">7</span>Put it together</h2>
		<p>One last idea: a <code>state</code> variable decides what the screen shows. <code>'start'</code> shows a title, <code>'play'</code> runs the game, <code>'over'</code> shows your score. A click moves between them.</p>
		<p>Here's the complete game. Replace everything in the editor with it:</p>
		{@render code('final', finalCode)}
		<div class="done">
			<i class="ph-bold ph-ghost"></i>
			<div>
				<b>That's Ghost Hunt.</b> Start screen, click to score, countdown, game over, retry. It's exactly the game on the <a href="/play/">Play page</a>. Now make it yours.
			</div>
		</div>
	</section>

	<section class="step" id="toolbox">
		<h2><span class="num">8</span>Toolbox: make it yours</h2>
		<p>Short functions you can drop into your game. Pick 1-3 that sound fun. Want to see them all combined? Check the <a href="/demo/">full demo</a>.</p>
		<div class="tools">
			{#each toolbox as tool}
				<article class="tool">
					<div class="tool-head"><h3>{tool.title}</h3><span class="tag">{tool.time}</span></div>
					<p>{tool.desc}</p>
					{@render code(tool.id, tool.code)}
				</article>
			{/each}
		</div>
	</section>

	<section class="step" id="checklist">
		<h2><span class="num">9</span>Checklist &amp; submit</h2>
		<ul class="checks">
			<li><i class="ph-bold ph-check-square"></i>Your game starts from the Ghost Hunt base above</li>
			<li><i class="ph-bold ph-check-square"></i>It has a start screen, a play state, and a game-over screen</li>
			<li><i class="ph-bold ph-check-square"></i>It's ghost or Halloween-themed</li>
			<li><i class="ph-bold ph-check-square"></i>You added 1-3 upgrades of your own</li>
			<li><i class="ph-bold ph-check-square"></i>You wrote it yourself: AI only to unblock a single line</li>
		</ul>
		<p>Read the <a href="/requirements/">full requirements</a> once more. How you submit depends on how you're building:</p>
		<div class="tabs" role="tablist">
			<button type="button" role="tab" aria-selected={track === 'workshop'} class:active={track === 'workshop'} onclick={() => (track = 'workshop')}>
				<i class="ph-bold ph-users-three"></i>At a workshop
			</button>
			<button type="button" role="tab" aria-selected={track === 'individual'} class:active={track === 'individual'} onclick={() => (track = 'individual')}>
				<i class="ph-bold ph-user"></i>Individual
			</button>
		</div>

		{#if track === 'workshop'}
			<div class="panel" role="tabpanel">
				<p>You need a free p5.js account so your game gets a link you can share.</p>
				<ol class="howto">
					<li>On <a href="https://editor.p5js.org/" target="_blank" rel="noopener">editor.p5js.org</a>, click <b>Sign up</b> in the top-right corner and make an account.</li>
					<li>Build your game in the editor while you're logged in.</li>
					<li>Click <b>File → Save</b> and give your sketch a name.</li>
					<li>Click <b>File → Share</b> and copy the <b>Edit</b> link. It shows your code and lets anyone press ▶ to play.</li>
					<li>Paste the link into your club's submission form, or send it to your club leader.</li>
				</ol>
			</div>
		{:else}
			<div class="panel" role="tabpanel">
				<p>Building on your own? You have to track your coding time with <a href="https://hackatime.hackclub.com" target="_blank" rel="noopener">Hackatime</a>. It only tracks code editors like VS Code, not the p5.js web editor, so build your game in VS Code.</p>
				<ol class="howto">
					<li>Go to <a href="https://hackatime.hackclub.com" target="_blank" rel="noopener">hackatime.hackclub.com</a>, sign in, and follow the setup steps for VS Code.</li>
					<li>In VS Code, install the <b>p5.vscode</b> extension, then run <b>Create p5.js Project</b> from the command palette (<code>Ctrl+Shift+P</code>).</li>
					<li>Install the <b>Live Server</b> extension and click <b>Go Live</b> to play your game in the browser. Hackatime logs your time while you code.</li>
					<li>When you're done, make a free account on <a href="https://editor.p5js.org/" target="_blank" rel="noopener">editor.p5js.org</a>, paste in your <code>sketch.js</code>, then <b>File → Save</b> and <b>File → Share</b> to get your game's link.</li>
					<li>Submit that link using the button below.</li>
				</ol>
				<div class="cta">
					<a class="btn primary" href={SUBMIT_URL}><i class="ph-bold ph-rocket-launch"></i>Submit your game</a>
					<a class="btn ghost" href="https://hackatime.hackclub.com" target="_blank" rel="noopener"><i class="ph-bold ph-clock"></i>Set up Hackatime</a>
				</div>
			</div>
		{/if}
	</section>
</main>

<SiteFooter />
</div>

<style>
	:global(:root) {
		--night: #14101c;
		--panel: #1d1728;
		--panel-line: #372c46;
		--code-bg: #0f0b16;
		--parchment: #f4ecd9;
		--parchment-dim: #b8ab99;
		--pumpkin: #ff8f3f;
		--mint: #8fd6b0;
		--font-display: 'Griffy', cursive;
		--font-body: 'Phantom Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
		--font-mono: 'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace;
	}
	:global(*) {
		box-sizing: border-box;
	}
	.page {
		min-height: 100vh;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		background: var(--night);
		color: var(--parchment);
		font-family: var(--font-body);
		line-height: 1.6;
	}
	main {
		flex: 1;
		width: 100%;
		max-width: 820px;
		margin: 0 auto;
		padding: clamp(24px, 5vh, 56px) 20px 56px;
	}
	a {
		color: var(--pumpkin);
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.88em;
		background: var(--code-bg);
		border: 1px solid var(--panel-line);
		border-radius: 5px;
		padding: 1px 5px;
		color: var(--mint);
	}

	.intro {
		margin-bottom: 24px;
	}
	.eyebrow {
		margin: 0 0 8px;
		color: var(--mint);
		font-size: 13px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}
	h1 {
		font-family: var(--font-display);
		font-size: clamp(2.6rem, 6vw, 3.8rem);
		line-height: 1.05;
		margin: 0 0 12px;
	}
	.lead {
		color: var(--parchment-dim);
		font-size: 1.1rem;
		margin: 0;
		max-width: 62ch;
	}
	.facts {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 20px;
		margin-top: 16px;
		font-size: 14px;
		color: var(--parchment-dim);
	}
	.facts b {
		color: var(--parchment);
	}

	.toc {
		background: var(--panel);
		border: 1px solid var(--panel-line);
		border-radius: 12px;
		padding: 16px 22px;
		margin-bottom: 20px;
	}
	.toc .label {
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--parchment-dim);
	}
	.toc ol {
		margin: 8px 0 0;
		padding-left: 20px;
		columns: 2;
		column-gap: 24px;
	}
	.toc a {
		color: var(--parchment);
		text-decoration: none;
	}
	.toc a:hover {
		color: var(--pumpkin);
	}

	.step {
		background: var(--panel);
		border: 1px solid var(--panel-line);
		border-radius: 12px;
		padding: 24px 26px;
		margin-bottom: 16px;
		scroll-margin-top: 16px;
	}
	.step h2 {
		display: flex;
		align-items: center;
		gap: 12px;
		font-family: var(--font-display);
		font-size: 1.6rem;
		line-height: 1.2;
		margin: 0 0 12px;
	}
	.num {
		display: inline-grid;
		place-items: center;
		width: 34px;
		height: 34px;
		flex-shrink: 0;
		border-radius: 50%;
		background: var(--pumpkin);
		color: #241505;
		font-family: var(--font-body);
		font-size: 16px;
		font-weight: 700;
	}
	.step h3 {
		font-size: 1.05rem;
		margin: 20px 0 4px;
		color: var(--mint);
	}
	.step p {
		margin: 0 0 12px;
		color: var(--parchment-dim);
	}
	.step p b,
	.step li b {
		color: var(--parchment);
	}
	.step ul {
		margin: 0 0 14px;
		padding-left: 20px;
		color: var(--parchment-dim);
		display: grid;
		gap: 6px;
	}

	.code-block {
		margin: 14px 0;
		padding: 14px 16px;
		overflow-x: auto;
		background: #000;
		color: #fff;
		font-family: var(--font-mono);
		font-size: 13.5px;
		line-height: 1.6;
	}

	.note,
	.done {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		border-radius: 10px;
		padding: 12px 14px;
		margin: 14px 0 0;
		color: var(--parchment);
		background: rgba(143, 214, 176, 0.08);
		border: 1px solid rgba(143, 214, 176, 0.3);
	}
	.note i,
	.done i {
		color: var(--mint);
		font-size: 18px;
		margin-top: 3px;
		flex-shrink: 0;
	}
	.done {
		background: rgba(255, 143, 63, 0.1);
		border-color: rgba(255, 143, 63, 0.4);
		font-size: 1.05rem;
	}
	.done i {
		color: var(--pumpkin);
		font-size: 26px;
		margin-top: 0;
	}
	.callout {
		margin-top: 16px;
		border-left: 4px solid var(--pumpkin);
		padding: 4px 0 4px 16px;
	}
	.callout h3 {
		margin-top: 0;
	}
	.callout p {
		margin: 0;
	}

	.tools {
		display: grid;
		gap: 14px;
	}
	.tool {
		border: 1px solid var(--panel-line);
		border-radius: 10px;
		padding: 16px 18px 4px;
	}
	.tool-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}
	.tool-head h3 {
		margin: 0;
		color: var(--parchment);
	}
	.tag {
		font-size: 12px;
		color: var(--mint);
		border: 1px solid var(--panel-line);
		border-radius: 999px;
		padding: 2px 10px;
		white-space: nowrap;
	}
	.tool p {
		margin: 6px 0 0;
	}

	.checks {
		list-style: none;
		padding-left: 0 !important;
	}
	.checks li {
		display: flex;
		gap: 10px;
		align-items: flex-start;
	}
	.checks i {
		color: var(--mint);
		font-size: 20px;
		flex-shrink: 0;
	}
	.cta {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
		margin-top: 8px;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 15px;
		font-weight: 700;
		text-decoration: none;
		padding: 12px 22px;
		border-radius: 999px;
		border: 2px solid var(--panel-line);
		color: var(--parchment);
	}
	.btn.primary {
		background: var(--pumpkin);
		border-color: var(--pumpkin);
		color: #241505;
	}
	.btn.ghost:hover {
		border-color: var(--pumpkin);
		color: var(--pumpkin);
	}

	.tabs {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin: 16px 0 0;
	}
	.tabs button {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font: inherit;
		font-size: 15px;
		font-weight: 700;
		padding: 10px 18px;
		border-radius: 999px;
		border: 2px solid var(--panel-line);
		background: transparent;
		color: var(--parchment);
		cursor: pointer;
	}
	.tabs button:hover {
		border-color: var(--pumpkin);
		color: var(--pumpkin);
	}
	.tabs button.active {
		background: var(--pumpkin);
		border-color: var(--pumpkin);
		color: #241505;
	}
	.panel {
		margin-top: 14px;
		border: 1px solid var(--panel-line);
		border-radius: 10px;
		padding: 16px 18px;
	}
	.howto {
		margin: 0 0 14px;
		padding-left: 22px;
		color: var(--parchment-dim);
		display: grid;
		gap: 8px;
	}
	.howto b {
		color: var(--parchment);
	}

	@media (max-width: 600px) {
		.toc ol {
			columns: 1;
		}
		.step {
			padding: 20px 18px;
		}
	}
</style>
