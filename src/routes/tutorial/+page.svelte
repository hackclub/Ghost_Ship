<script>
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { SUBMIT_URL } from '$lib/links.js';
	import Preview from '$lib/Preview.svelte';
	import * as previews from '$lib/previews.js';

	let track = $state('workshop');

	const indexCode = [
		{
			src: String.raw`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Ghost Hunt</title>
    <script src="https://cdn.jsdelivr.net/npm/p5@1/lib/p5.min.js">${"<"}/script>
  </head>
  <body>
    <script src="sketch.js">${"<"}/script>
  </body>
</html>`
		}
	];

	const setupCode = [
		{
			src: String.raw`function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}`
		}
	];

	const shapesCode = [
		{
			say: 'In setup(), make the canvas game-sized:',
			src: String.raw`function setup() {
  createCanvas(480, 360);
}`
		},
		{
			say: 'In draw(), paint the night sky and turn off outlines:',
			src: String.raw`background(15, 10, 25);
noStroke();`
		},
		{
			say: 'Below that, a pale yellow moon. The numbers are x, y, width, height:',
			src: String.raw`fill(255, 240, 200);
ellipse(400, 60, 50, 50);`
		},
		{
			say: 'Then dark purple ground along the bottom:',
			src: String.raw`fill(40, 30, 50);
rect(0, 300, 480, 60);`
		}
	];

	const ghostCode = [
		{
			say: 'Add this function at the bottom of your sketch. It draws a minty body and two dark eyes:',
			src: String.raw`function drawGhost(x, y) {
  noStroke();
  fill(220, 255, 230);
  ellipse(x, y, 60, 60);

  fill(20);
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);
}`
		},
		{
			say: 'Then call it in draw(). Each call draws one, so this draws two:',
			src: String.raw`function draw() {
  background(15, 10, 25);
  drawGhost(240, 180);
  drawGhost(100, 80);
}`
		}
	];

	const wobbleCode = [
		{
			say: 'At the top of your sketch, store where the ghost is:',
			src: String.raw`let ghost = { x: 240, y: 180 };`
		},
		{
			say: 'In draw(), nudge it a little every frame, then draw it:',
			src: String.raw`function draw() {
  background(15, 10, 25);
  ghost.x += random(-3, 3);
  ghost.y += random(-3, 3);
  drawGhost(ghost.x, ghost.y);
}`
		}
	];

	const spawnCode = [
		{
			say: 'At the top, make the ghost and set how many frames to wait between jumps:',
			src: String.raw`let ghost;
let spawnEvery = 60;`
		},
		{
			say: 'Add a function that moves the ghost to a random spot:',
			src: String.raw`function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(40, height - 40) };
}`
		},
		{
			say: 'Call it once in setup() so the ghost has a starting spot:',
			src: String.raw`function setup() {
  createCanvas(480, 360);
  spawnGhost();
}`
		},
		{
			say: 'In draw(), jump every 60th frame, then draw the ghost:',
			src: String.raw`function draw() {
  background(15, 10, 25);
  if (frameCount % spawnEvery === 0) spawnGhost();
  drawGhost(ghost.x, ghost.y);
}`
		}
	];

	const clickCode = [
		{
			say: 'At the top, start the score at zero:',
			src: String.raw`let score = 0;`
		},
		{
			say: 'Add mousePressed(). A hit adds a point and moves the ghost somewhere new:',
			src: String.raw`function mousePressed() {
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;
    spawnGhost();
  }
}`
		},
		{
			say: 'At the end of draw(), show the score:',
			src: String.raw`fill(255);
textSize(16);
text('Score: ' + score, 12, 26);`
		}
	];

	const timerCode = [
		{
			say: 'At the top, set how many seconds a round lasts:',
			src: String.raw`let duration = 30;
let startTime;`
		},
		{
			say: 'In setup(), save when the round started:',
			src: String.raw`startTime = millis();`
		},
		{
			say: 'In draw(), before drawing the ghost, work out how much time is left:',
			src: String.raw`let elapsed = (millis() - startTime) / 1000;
let timeLeft = max(0, duration - elapsed);`
		},
		{
			say: 'Then show it in the top-right corner:',
			src: String.raw`textAlign(RIGHT, TOP);
text('Time: ' + ceil(timeLeft), width - 12, 10);`
		}
	];

	const finalCode = [
		{
			say: 'The variables. state is always one of start, play, or over:',
			src: String.raw`let ghost;
let score = 0;
let duration = 30;
let startTime;
let state = 'start';
let spawnEvery = 60;`
		},
		{
			say: 'setup() makes the canvas and the first ghost:',
			src: String.raw`function setup() {
  createCanvas(480, 360);
  spawnGhost();
}`
		},
		{
			say: 'draw() starts with the start and game-over screens. return stops draw() early, so nothing below it runs:',
			src: String.raw`function draw() {
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
  }`
		},
		{
			say: 'Still in draw(): end the round when the time runs out:',
			src: String.raw`  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) {
    state = 'over';
    return;
  }`
		},
		{
			say: 'Then move and draw the ghost, show the score and time, and close draw():',
			src: String.raw`  if (frameCount % spawnEvery === 0) spawnGhost();
  drawGhost(ghost.x, ghost.y);

  textAlign(LEFT, TOP);
  fill(255);
  textSize(16);
  text('Score: ' + score, 12, 10);
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);
}`
		},
		{
			say: 'mousePressed() starts a new round from the start or game-over screen, and scores hits during play:',
			src: String.raw`function mousePressed() {
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
}`
		},
		{
			say: 'Last, the two helper functions from earlier:',
			src: String.raw`function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(40, height - 40) };
}

function drawGhost(x, y) {
  noStroke();
  fill(220, 255, 230);
  ellipse(x, y, 60, 60);
  fill(20);
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);
}`
		}
	];

	const toolbox = [
		{
			title: 'Haunted wobble',
			time: '1-2 hours',
			desc: 'Make the ghost shiver in place while it waits to be clicked.',
			code: [
				{
					say: 'In draw(), just before drawGhost():',
					src: String.raw`ghost.x += random(-2, 2);
ghost.y += random(-2, 2);`
				}
			]
		},
		{
			title: 'Floating movement',
			time: '1-2 hours',
			desc: 'Give the ghost a speed and bounce it off the walls instead of sitting still.',
			code: [
				{
					say: 'In spawnGhost(), after making the ghost:',
					src: String.raw`ghost.vx = random(-2, 2);
ghost.vy = random(-2, 2);`
				},
				{
					say: 'In draw(), before drawGhost():',
					src: String.raw`ghost.x += ghost.vx;
ghost.y += ghost.vy;
if (ghost.x < 30 || ghost.x > width - 30) ghost.vx *= -1;
if (ghost.y < 30 || ghost.y > height - 30) ghost.vy *= -1;`
				}
			]
		},
		{
			title: 'Draw a pumpkin',
			time: '1-2 hours',
			desc: 'A second thing to draw: an orange body, a green stem, and a spooky face. Swap it in for the ghost, or use it as a bonus target.',
			code: [
				{
					say: 'Add this function, then call drawPumpkin(x, y) the same way as drawGhost():',
					src: String.raw`function drawPumpkin(x, y) {
  noStroke();
  fill(255, 140, 40);
  ellipse(x, y, 64, 52);
  fill(60, 140, 60);
  rect(x - 4, y - 34, 8, 12);
  fill(30);
  triangle(x - 16, y - 4, x - 8, y - 12, x - 2, y - 4);
  triangle(x + 2, y - 4, x + 8, y - 12, x + 16, y - 4);
  rect(x - 12, y + 8, 24, 5);
}`
				}
			]
		},
		{
			title: 'See-through ghost',
			time: '1-2 hours',
			desc: 'A fourth number in fill() is transparency. Make the ghost fade in and out.',
			code: [
				{
					say: 'In drawGhost(), replace the body fill() with:',
					src: String.raw`let alpha = map(sin(frameCount * 0.05), -1, 1, 80, 255);
fill(220, 255, 230, alpha);`
				}
			]
		},
		{
			title: 'Get harder over time',
			time: '1-2 hours',
			desc: 'Shrink the time between jumps from 60 frames to 20 as the round goes on.',
			code: [
				{
					say: 'In draw(), replace the spawnEvery line with:',
					src: String.raw`let progress = constrain(elapsed / duration, 0, 1);
let interval = floor(lerp(60, 20, progress));
if (frameCount % interval === 0) spawnGhost();`
				}
			]
		},
		{
			title: 'Particle burst on a hit',
			time: '1-2 hours',
			desc: 'Tiny dots fly out from the ghost when you catch it, then fade away.',
			code: [
				{
					say: 'At the top of your sketch:',
					src: String.raw`let particles = [];`
				},
				{
					say: 'Add a function that sends 10 dots flying from a point:',
					src: String.raw`function burst(x, y) {
  for (let i = 0; i < 10; i++) {
    let a = random(TWO_PI);
    particles.push({ x: x, y: y, vx: cos(a) * 2, vy: sin(a) * 2, life: 1 });
  }
}`
				},
				{
					say: 'In mousePressed(), call it on a hit:',
					src: String.raw`burst(ghost.x, ghost.y);`
				},
				{
					say: 'At the end of draw(), move, fade, and draw each dot:',
					src: String.raw`for (let i = particles.length - 1; i >= 0; i--) {
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
			]
		}
	];
</script>

{#snippet trackTabs()}
	<div class="tabs" role="tablist">
		<button type="button" role="tab" aria-selected={track === 'workshop'} class:active={track === 'workshop'} onclick={() => (track = 'workshop')}>
			<i class="ph-bold ph-users-three"></i>At a workshop
		</button>
		<button type="button" role="tab" aria-selected={track === 'individual'} class:active={track === 'individual'} onclick={() => (track = 'individual')}>
			<i class="ph-bold ph-user"></i>Individual
		</button>
	</div>
{/snippet}

{#snippet webEditor()}
	<ol class="howto shots">
		<li>
			Go to <a href="https://editor.p5js.org/" target="_blank" rel="noopener">editor.p5js.org</a>.
			<img src="/media/accountmake.png" alt="The p5.js web editor, with an arrow pointing at Sign up in the top-right corner" />
			<span class="caption">Click <b>Sign up</b> in the top-right corner to make an account.</span>
		</li>
		<li>
			Fill in a user name, email, and password, or log in with GitHub or Google.
			<img src="/media/account.png" alt="The p5.js Sign Up form" class="narrow" />
			<span class="privacy"><i class="ph-bold ph-shield-check"></i>It only asks for the minimum: a user name, an email, and a password. Only your user name shows up next to your sketches, so a nickname is fine.</span>
		</li>
		<li>
			Click the pencil next to the made-up sketch name at the top and type your own.
			<img src="/media/name.png" alt="The p5.js editor, with an arrow pointing at the sketch name and its pencil icon" />
			<span class="caption">Name your project!</span>
		</li>
		<li>
			Here's how the editor works:
			<img src="/media/1234.png" alt="The p5.js editor with five numbered parts" />
			<ol class="parts">
				<li><b>Run:</b> runs your code.</li>
				<li><b>Stop:</b> stops it.</li>
				<li><b>Code:</b> where you write your sketch.</li>
				<li><b>Preview:</b> shows what your game looks like.</li>
				<li><b>Console:</b> shows errors. Look here when something breaks.</li>
			</ol>
		</li>
	</ol>
{/snippet}

{#snippet withPreview(chunks, sketch, hint)}
	<div class="split">
		<div class="split-code">{@render code(chunks)}</div>
		<Preview {sketch} {hint} />
	</div>
{/snippet}

{#snippet code(chunks)}
	{#each chunks as chunk}
		{#if chunk.say}<p class="where">{chunk.say}</p>{/if}
		<pre class="code-block">{chunk.src}</pre>
	{/each}
{/snippet}

<svelte:head>
	<title>Ghost Ship | Guide</title>
</svelte:head>

<div class="page">

<SiteHeader current="guide" />

<main>
	<header class="intro">
		<h1>Get started with p5.js</h1>
		<p class="lead">This guide assumes you've never used p5.js. You'll learn how drawing works, draw your own ghost, and make it move.</p>
		<div class="facts">
			<span><b>Needs:</b> a browser, plus VS Code if you're on your own</span>
			<span><b>Language:</b> JavaScript</span>
			<span><b>Time:</b> about 1 hour for the base game</span>
		</div>
	</header>

	<nav class="toc">
		<span class="label">On this page</span>
		<ol>
			<li><a href="#setup">Set up</a></li>
			<li><a href="#what">What is p5.js?</a></li>
			<li><a href="#draw">Draw shapes</a></li>
			<li><a href="#ghost">Draw your creature</a></li>
			<li><a href="#move">Make it move randomly</a></li>
			<li><a href="#click">Click to score</a></li>
			<li><a href="#timer">Add a timer</a></li>
			<li><a href="#together">Put it together</a></li>
			<li><a href="#toolbox">Toolbox: make it yours</a></li>
			<li><a href="#checklist">Checklist &amp; submit</a></li>
		</ol>
	</nav>

	<section class="step" id="setup">
		<h2><span class="num">1</span>Set up</h2>
		<p>Where you write your code depends on how you're building. Pick one:</p>
		{@render trackTabs()}

		{#if track === 'workshop'}
			<div class="panel" role="tabpanel">
				<p>At a club workshop, you build everything in the free p5.js web editor. Nothing to install.</p>
				{@render webEditor()}
			</div>
		{:else}
			<div class="panel" role="tabpanel">
				<p>On your own, your coding time has to be tracked. Pick one way:</p>
				<h3>Option A: Lapse + the web editor</h3>
				<p>Record your time with <a href="https://lapse.hackclub.com" target="_blank" rel="noopener">lapse.hackclub.com</a>, and build in the p5.js web editor, the same way as a workshop. Questions about Lapse? <a href="https://hackclub.enterprise.slack.com/archives/C0AJ1FK8E8Z" target="_blank" rel="noopener">Ask in the Slack</a>.</p>
				{@render webEditor()}
				<h3>Option B: VS Code + Hackatime</h3>
				<p><a href="https://hackatime.hackclub.com" target="_blank" rel="noopener">Hackatime</a> tracks your time in code editors like VS Code.</p>
				<ol class="howto">
					<li>Install <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VS Code</a>.</li>
					<li>Go to <a href="https://hackatime.hackclub.com" target="_blank" rel="noopener">hackatime.hackclub.com</a>, sign in, and follow its setup steps. They connect VS Code to your account, so your time is logged while you code.</li>
					<li>Make a folder called <code>ghost-hunt</code> and open it in VS Code with <b>File → Open Folder</b>.</li>
					<li>Make a file called <code>index.html</code> in the folder and paste this in. It loads p5.js and your game:
						{@render code(indexCode)}
					</li>
					<li>Make a second file called <code>sketch.js</code>. Your game code goes here.</li>
					<li>Install the <b>Live Server</b> extension. Open <code>index.html</code> and click <b>Go Live</b> in the bottom bar. Your game opens in the browser and reloads every time you save.</li>
				</ol>
			</div>
		{/if}
	</section>

	<section class="step" id="what">
		<h2><span class="num">2</span>What is p5.js?</h2>
		<p>p5.js is a JavaScript library for drawing and animating in the browser. You get a <b>canvas</b>, a rectangle of pixels, and simple functions like <code>ellipse()</code> and <code>rect()</code> to draw on it.</p>
		<p>Every p5.js sketch has two special functions:</p>
		<ul>
			<li><code>setup()</code> runs <b>once</b> when the sketch starts. Make the canvas here.</li>
			<li><code>draw()</code> runs <b>again and again</b>, about 60 times a second. Each run is one frame, like a page in a flipbook.</li>
		</ul>
		<p>The p5.js web editor starts you with this code. In VS Code, paste it into <code>sketch.js</code>:</p>
		{@render withPreview(setupCode, previews.starter, '')}
		<p>Here's what each line does:</p>
		<ul>
			<li><code>createCanvas(400, 400)</code> makes the drawing area: 400 pixels wide, 400 pixels tall. It's in <code>setup()</code> because you only need one canvas.</li>
			<li><code>background(220)</code> paints the whole canvas one color. With a single number, it's a shade of gray: <code>0</code> is black, <code>255</code> is white, so <code>220</code> is light gray. It's in <code>draw()</code> so every frame starts from a clean canvas.</li>
		</ul>
		<div class="note"><i class="ph-bold ph-play"></i><span>Press ▶ Play in the web editor, or save in VS Code with Live Server running. You'll see a light gray square: that's your game screen.</span></div>
		<div class="callout">
			<h3>How positions work</h3>
			<p>Every point on the canvas is an <b>(x, y)</b> pair. <code>(0, 0)</code> is the <b>top-left</b> corner. <b>x</b> grows to the right, <b>y</b> grows <b>downward</b>. On a 400 × 400 canvas, the middle is <code>(200, 200)</code>. Inside your sketch, <code>width</code> and <code>height</code> hold those sizes for you.</p>
		</div>
	</section>

	<section class="step" id="draw">
		<h2><span class="num">3</span>Draw shapes</h2>
		<p>First, set up the game screen: change the canvas to <code>createCanvas(480, 360)</code> (wider, like a game) and the background to <code>background(15, 10, 25)</code> (dark purple, for a spooky night). The rest of the guide uses these values.</p>
		<p>Drawing in p5.js works like painting: pick a color, then draw a shape with it. Shapes drawn later go on top.</p>
		<ul>
			<li><code>background(r, g, b)</code> fills the whole canvas. Calling it at the start of <code>draw()</code> wipes the last frame.</li>
			<li><code>fill(r, g, b)</code> sets the color for the next shapes. Each number is 0-255: red, green, blue.</li>
			<li><code>noStroke()</code> turns off outlines.</li>
			<li><code>ellipse(x, y, w, h)</code> draws a circle or oval centered at (x, y).</li>
			<li><code>rect(x, y, w, h)</code> draws a rectangle from its top-left corner.</li>
		</ul>
		{@render withPreview(shapesCode, previews.shapes, '')}
		<div class="note"><i class="ph-bold ph-lightbulb"></i><span><b>Try it:</b> move the moon by changing <code>400, 60</code>. Change the fill numbers to make a blood-red moon.</span></div>
	</section>

	<section class="step" id="ghost">
		<h2><span class="num">4</span>Draw your creature</h2>
		<p>Now make a drawing of your own. Put the drawing inside a <b>function</b> with <code>x</code> and <code>y</code> parameters. Then you can draw the ghost anywhere, as many times as you want, with one line.</p>
		<p>Every shape inside uses <code>x</code> and <code>y</code> as its starting point, so the eyes move with the body.</p>
		{@render withPreview(ghostCode, previews.creature, '')}
		<div class="note"><i class="ph-bold ph-paint-brush"></i><span><b>Your turn:</b> make it yours. Add a mouth with another <code>ellipse()</code>, give it a hat with <code>rect()</code>, or change its color. Keep the body about 60 pixels wide: the click check later expects that.</span></div>
	</section>

	<section class="step" id="move">
		<h2><span class="num">5</span>Make it move randomly</h2>
		<p><code>random(a, b)</code> gives you a different number between <code>a</code> and <code>b</code> every time you call it. That's the key to anything unpredictable.</p>
		<p>First, store the ghost's position in a <b>variable</b> so it can change between frames. <code>{'{ x: 240, y: 180 }'}</code> is an <b>object</b>: one variable holding both numbers.</p>
		<h3>Option A: haunted drift</h3>
		<p>Nudge the ghost a random amount every frame. It shivers and wanders around like it's possessed.</p>
		{@render withPreview(wobbleCode, previews.drift, '')}
		<h3>Option B: teleport</h3>
		<p>This is what Ghost Hunt does. Every 60 frames (about one second), the ghost jumps to a random spot. <code>frameCount</code> counts frames since the start, and <code>%</code> gives the remainder of a division, so <code>frameCount % 60 === 0</code> is true once every 60 frames.</p>
		{@render withPreview(spawnCode, previews.teleport, '')}
		<div class="note"><i class="ph-bold ph-lightbulb"></i><span>The <code>40</code> and <code>width - 40</code> keep the ghost from spawning half off the edge. Keep your <code>drawGhost()</code> function from step 3 at the bottom of the file.</span></div>
	</section>

	<section class="step" id="click">
		<h2><span class="num">6</span>Click to score</h2>
		<p>p5.js calls <code>mousePressed()</code> every time you click. <code>mouseX</code> and <code>mouseY</code> hold where the click happened.</p>
		<p><code>dist()</code> measures the distance between two points. The ghost is 60 pixels wide, so its radius is 30: a click closer than 30 pixels to its center is a hit. An <code>if</code> statement runs code only when that's true.</p>
		{@render withPreview(clickCode, previews.click, 'click the ghost')}
		<div class="note"><i class="ph-bold ph-cursor-click"></i><span><b>Try it:</b> click the ghost a few times. The score goes up and the ghost jumps somewhere new.</span></div>
	</section>

	<section class="step" id="timer">
		<h2><span class="num">7</span>Add a timer</h2>
		<p><code>millis()</code> is how many milliseconds have passed since the sketch started (1000 ms = 1 second). Save it when the round begins, and subtract to see how long the round has lasted.</p>
		{@render withPreview(timerCode, previews.timer, 'click the ghost')}
	</section>

	<section class="step" id="together">
		<h2><span class="num">8</span>Put it together</h2>
		<p>One last idea: a <code>state</code> variable decides what the screen shows. <code>'start'</code> shows a title, <code>'play'</code> runs the game, <code>'over'</code> shows your score. A click moves between them.</p>
		<p>Here's the complete game, piece by piece. Clear the editor, then copy each piece in, top to bottom:</p>
		{@render withPreview(finalCode, previews.full, 'click to play')}
		<div class="done">
			<i class="ph-bold ph-ghost"></i>
			<div>
				<b>That's Ghost Hunt.</b> Start screen, click to score, countdown, game over, retry. It's exactly the game on the <a href="/play/">Play page</a>. Now make it yours.
			</div>
		</div>
	</section>

	<section class="step" id="toolbox">
		<h2><span class="num">9</span>Toolbox: make it yours</h2>
		<p>Features you can add to your game. Each one takes about 1-2 hours to add and make your own. Pick 1-3 that sound fun. Want to see them all combined? Check the <a href="/demo/">full demo</a>.</p>
		<div class="tools">
			{#each toolbox as tool}
				<article class="tool">
					<div class="tool-head"><h3>{tool.title}</h3><span class="tag">{tool.time}</span></div>
					<p>{tool.desc}</p>
					{@render withPreview(tool.code, previews.toolbox[tool.title], tool.title === 'Draw a pumpkin' ? '' : 'click to play')}
				</article>
			{/each}
		</div>
	</section>

	<section class="step" id="checklist">
		<h2><span class="num">10</span>Checklist &amp; submit</h2>
		<ul class="checks">
			<li><i class="ph-bold ph-check-square"></i>Your game starts from the Ghost Hunt base above</li>
			<li><i class="ph-bold ph-check-square"></i>It has a start screen, a play state, and a game-over screen</li>
			<li><i class="ph-bold ph-check-square"></i>It's ghost or Halloween-themed</li>
			<li><i class="ph-bold ph-check-square"></i>You added 1-3 upgrades of your own</li>
			<li><i class="ph-bold ph-check-square"></i>You wrote it yourself: AI only to unblock a single line</li>
		</ul>
		<p>Read the <a href="/requirements/">full requirements</a> once more. How you submit depends on how you're building:</p>
		{@render trackTabs()}

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
				<p>On your own, you submit your code on GitHub and a live link where anyone can play your game. Both are free. GitHub Pages turns your repo into a website.</p>
				<p>First, make a free account on <a href="https://github.com/" target="_blank" rel="noopener">github.com</a>.</p>
				<h3>Used the web editor (Lapse)?</h3>
				<ol class="howto">
					<li>In the p5.js editor, click <b>File → Download</b> and unzip the file.</li>
					<li>On github.com, click <b>+ → New repository</b>, name it <code>ghost-hunt</code>, make it <b>Public</b>, and click <b>Create repository</b>.</li>
					<li>Click <b>uploading an existing file</b>, drag in everything from the unzipped folder (<code>index.html</code>, <code>sketch.js</code>, and the rest), and click <b>Commit changes</b>.</li>
					<li>Turn on GitHub Pages and submit: follow the last 3 steps under <b>Used VS Code?</b> below.</li>
				</ol>
				<h3>Used VS Code?</h3>
				<ol class="howto">
					<li>In VS Code, open <b>Source Control</b> (<code>Ctrl+Shift+G</code>) and click <b>Initialize Repository</b>.</li>
					<li>Type a message like <code>first version</code> and click <b>Commit</b>. If it asks to stage your changes, click <b>Yes</b>.</li>
					<li>Click <b>Publish Branch</b>, sign in to GitHub, and pick <b>Publish to GitHub public repository</b>. VS Code makes the repo and uploads your code.</li>
					<li>On github.com, open your repo and go to <b>Settings → Pages</b>. Under <b>Build and deployment</b>, set <b>Source</b> to <b>Deploy from a branch</b>, pick <b>main</b> and <b>/ (root)</b>, and click <b>Save</b>.</li>
					<li>Wait about a minute and refresh. Your game's link appears at the top of that page, like <code>https://your-name.github.io/ghost-hunt/</code>. Open it and make sure the game plays.</li>
					<li>Submit your repo link and your Pages link with the button below.</li>
				</ol>
				<div class="note"><i class="ph-bold ph-lightbulb"></i><span>Changed something? <b>Commit</b>, then click <b>Sync Changes</b>. Your live link updates about a minute later. Keep <code>index.html</code> in the top of your folder, not in a subfolder, or Pages shows a 404 page.</span></div>
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
		max-width: 980px;
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

	.step p.where {
		margin: 16px 0 0;
		font-weight: 700;
	}
	.step p.where + .code-block {
		margin-top: 8px;
	}
	.split {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 280px;
		gap: 20px;
		align-items: start;
		margin: 14px 0;
	}
	.split-code > :first-child {
		margin-top: 0;
	}
	@media (max-width: 760px) {
		.split {
			grid-template-columns: 1fr;
		}
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
	.howto.shots {
		gap: 22px;
	}
	.shots img {
		display: block;
		width: 100%;
		height: auto;
		margin: 10px 0 0;
		border: 1px solid var(--panel-line);
		border-radius: 8px;
	}
	.shots img.narrow {
		max-width: 320px;
	}
	.caption {
		display: block;
		margin-top: 8px;
		color: var(--parchment);
		font-weight: 700;
	}
	.privacy {
		display: flex;
		gap: 8px;
		align-items: flex-start;
		margin-top: 10px;
		color: var(--parchment-dim);
	}
	.privacy i {
		color: var(--mint);
		margin-top: 4px;
	}
	.parts {
		margin: 10px 0 0;
		padding-left: 22px;
		display: grid;
		gap: 4px;
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
