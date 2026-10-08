<script>
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import StickerSheet from '$lib/StickerSheet.svelte';
	import { SUBMIT_URL } from '$lib/links.js';
	import Preview from '$lib/Preview.svelte';
	import { onMount } from 'svelte';
	import * as previews from '$lib/previews.js';

	let track = $state('workshop');
	let tool = $state('lapse');

	const steps = [
		{ id: 'setup', label: 'Set up' },
		{ id: 'what', label: 'What is p5.js?' },
		{ id: 'draw', label: 'Draw shapes' },
		{ id: 'ghost', label: 'Draw your creature' },
		{ id: 'move', label: 'Make it move randomly' },
		{ id: 'click', label: 'Click to score' },
		{ id: 'timer', label: 'Add a timer' },
		{ id: 'together', label: 'Put it together' },
		{ id: 'unique', label: 'Make it unique' },
		{ id: 'extra', label: 'Already done?' },
		{ id: 'checklist', label: 'Checklist & submit' }
	];
	let active = $state('setup');

	function jump(event, id) {
		event.preventDefault();
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		history.replaceState(null, '', '#' + id);
		active = id;
	}

	onMount(() => {
		const update = () => {
			let current = steps[0].id;
			for (const step of steps) {
				const el = document.getElementById(step.id);
				if (el && el.getBoundingClientRect().top <= 120) current = step.id;
			}
			active = current;
		};
		update();
		window.addEventListener('scroll', update, { passive: true });
		return () => window.removeEventListener('scroll', update);
	});

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
			say: 'Below that, draw a pale yellow moon, where the four numbers are its x, y, width, and height:',
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
			say: 'Add this function at the bottom of your sketch to draw a minty body with two dark eyes:',
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
			say: 'Then call it in draw(), where each call draws one ghost, so this draws two:',
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
			say: 'Add mousePressed(), so a hit adds a point and moves the ghost somewhere new:',
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
			say: 'Start with the variables, where state is always one of start, play, or over:',
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
			say: 'draw() begins with the start and game-over screens, and return stops draw() early so nothing below it runs:',
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

	const ref = (name) => ({ name: name + '()', url: 'https://p5js.org/reference/p5/' + name + '/' });
	const example = (name, slug) => ({ name, url: 'https://p5js.org/examples/' + slug + '/' });

	const features = [
		{
			title: 'Haunted wobble',
			desc: 'Make your creature shiver in place by nudging its position a tiny random amount every frame.',
			docs: [ref('random')],
			example: example('Random', 'Calculating-Values-Random')
		},
		{
			title: 'Floating movement',
			desc: 'Give your creature a speed in x and y so it drifts around and bounces off the edges of the canvas.',
			docs: [ref('constrain')],
			example: example('Bouncing ball', 'Classes-And-Objects-Shake-Ball-Bounce')
		},
		{
			title: 'A second creature',
			desc: 'Draw something new, like a pumpkin or a bat, out of arcs, triangles, and custom shapes, then use it as a bonus target or something to avoid.',
			docs: [ref('arc'), ref('triangle'), ref('beginShape')],
			example: example('Shape primitives', 'Shapes-And-Color-Shape-Primitives')
		},
		{
			title: 'See-through ghost',
			desc: 'Add a fourth number to fill() for transparency, then use sin() and map() to make your creature fade in and out.',
			docs: [ref('fill'), ref('sin'), ref('map')],
			example: example('Sine and cosine', 'Angles-And-Motion-Sine-Cosine')
		},
		{
			title: 'Get harder over time',
			desc: 'Use lerp() to shrink the time between jumps as the round goes on, so the game keeps speeding up.',
			docs: [ref('lerp'), ref('constrain'), ref('frameCount')],
			example: example('Interpolate', 'Calculating-Values-Interpolate')
		},
		{
			title: 'Particle burst',
			desc: 'Keep a list of tiny dots that fly out when you catch something, fade away, and get removed from the list.',
			docs: [ref('random'), { name: 'Array splice()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice' }],
			example: example('Smoke particle system', 'Math-And-Physics-Smoke-Particle-System')
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

{#snippet toolTabs()}
	<div class="tabs" role="tablist">
		<button type="button" role="tab" aria-selected={tool === 'lapse'} class:active={tool === 'lapse'} onclick={() => (tool = 'lapse')}>
			<i class="ph-bold ph-video-camera"></i>Lapse + web editor
		</button>
		<button type="button" role="tab" aria-selected={tool === 'vscode'} class:active={tool === 'vscode'} onclick={() => (tool = 'vscode')}>
			<i class="ph-bold ph-code"></i>VS Code + Hackatime
		</button>
	</div>
{/snippet}

{#snippet pagesSteps()}
	<li>On github.com, open your repo and go to <b>Settings → Pages</b>. Under <b>Build and deployment</b>, set <b>Source</b> to <b>Deploy from a branch</b>, pick <b>main</b> and <b>/ (root)</b>, and click <b>Save</b>.</li>
	<li>Wait about a minute and refresh, and your game's link will appear at the top of that page, like <code>https://your-name.github.io/your-repo/</code>. Open it to make sure the game plays.</li>
	<li>Submit your repo link and your Pages link with the button below.</li>
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
			<span class="privacy"><i class="ph-bold ph-shield-check"></i>It only asks for the minimum (a user name, an email, and a password), and only your user name shows up next to your sketches, so a nickname is fine.</span>
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
				<li><b>Console:</b> shows errors, so look here when something breaks.</li>
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
	</header>

	<div class="layout">
	<nav class="toc" aria-label="Guide steps">
		<span class="label">Steps</span>
		<ol>
			{#each steps as step, i}
				<li>
					<a href="#{step.id}" class:active={active === step.id} onclick={(e) => jump(e, step.id)}>
						<span class="n">{i + 1}</span>{step.label}
					</a>
				</li>
			{/each}
		</ol>
	</nav>

	<div class="content">

	<section class="step" id="setup">
		<h2><span class="num">1</span>Set up</h2>
		<p>Select where you're completing this event!</p>
		{@render trackTabs()}

		{#if track === 'workshop'}
			<div class="panel" role="tabpanel">
				<p>At a club workshop, you build everything in the free p5.js web editor, so there's nothing to install.</p>
				{@render webEditor()}
			</div>
		{:else}
			<div class="panel" role="tabpanel">
				<p>On your own, your coding time has to be tracked, so pick one of these two ways:</p>
				{@render toolTabs()}
				{#if tool === 'lapse'}
				<p>Record your time with <a href="https://lapse.hackclub.com" target="_blank" rel="noopener">lapse.hackclub.com</a>, and build in the p5.js web editor, the same way as a workshop. Questions about Lapse? Ask in <a href="https://hackclub.enterprise.slack.com/archives/C0AJ1FK8E8Z" target="_blank" rel="noopener">#lapse</a> in the <a href="https://slack.hackclub.com/" target="_blank" rel="noopener">Hack Club Slack</a>.</p>
				{@render webEditor()}
				{:else}
				<p><a href="https://hackatime.hackclub.com" target="_blank" rel="noopener">Hackatime</a> tracks your time in code editors like VS Code.</p>
				<ol class="howto">
					<li>Install <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VS Code</a>.</li>
					<li>Go to <a href="https://hackatime.hackclub.com" target="_blank" rel="noopener">hackatime.hackclub.com</a>, sign in, and follow its setup steps, which connect VS Code to your account so your time is logged while you code.</li>
					<li>Make a folder and open it in VS Code with <b>File → Open Folder</b>.</li>
					<li>Make a file called <code>index.html</code> in the folder and paste this in, which loads p5.js and your game:
						{@render code(indexCode)}
					</li>
					<li>Make a second file called <code>sketch.js</code>, where your game code goes.</li>
					<li>Install the <b>Live Server</b> extension, open <code>index.html</code>, and click <b>Go Live</b> in the bottom bar to open your game in the browser, where it reloads every time you save.</li>
				</ol>
				{/if}
			</div>
		{/if}
	</section>

	<section class="step" id="what">
		<h2><span class="num">2</span>What is p5.js?</h2>
		<p>p5.js is a JavaScript library for drawing and animating in the browser. You get a <b>canvas</b>, a rectangle of pixels, and simple functions like <code>ellipse()</code> and <code>rect()</code> to draw on it.</p>
		<p>Every p5.js sketch has two special functions:</p>
		<ul>
			<li><code>setup()</code> runs <b>once</b> when the sketch starts, so it's where you make the canvas.</li>
			<li><code>draw()</code> runs <b>again and again</b>, about 60 times a second, and each run is one frame, like a page in a flipbook.</li>
		</ul>
		<p>The p5.js web editor starts you with this code, and in VS Code you can paste it into <code>sketch.js</code>:</p>
		{@render withPreview(setupCode, previews.starter, '')}
		<p>Here's what each line does:</p>
		<ul>
			<li><code>createCanvas(400, 400)</code> makes a drawing area 400 pixels wide and 400 pixels tall, and it's in <code>setup()</code> because you only need one canvas.</li>
			<li><code>background(220)</code> paints the whole canvas one color, and with a single number that color is a shade of gray from <code>0</code> (black) to <code>255</code> (white), so <code>220</code> is light gray. It's in <code>draw()</code> so every frame starts from a clean canvas.</li>
		</ul>
		<div class="note"><i class="ph-bold ph-play"></i><span>Press ▶ Play in the web editor, or save in VS Code with Live Server running, and you'll see a light gray square: that's your game screen.</span></div>
		<div class="callout">
			<h3>How positions work</h3>
			<p>Every point on the canvas is an <b>(x, y)</b> pair, starting from <code>(0, 0)</code> in the <b>top-left</b> corner, with <b>x</b> growing to the right and <b>y</b> growing <b>downward</b>. On a 400 × 400 canvas the middle is <code>(200, 200)</code>, and inside your sketch <code>width</code> and <code>height</code> hold those sizes for you.</p>
		</div>
	</section>

	<section class="step" id="draw">
		<h2><span class="num">3</span>Draw shapes</h2>
		<p>First, set up the game screen: change the canvas to <code>createCanvas(480, 360)</code> (wider, like a game) and the background to <code>background(15, 10, 25)</code> (dark purple, for a spooky night), since the rest of the guide uses these values.</p>
		<p>Drawing in p5.js works like painting: you pick a color, then draw a shape with it, and shapes drawn later go on top.</p>
		<ul>
			<li><code>background(r, g, b)</code> fills the whole canvas, so calling it at the start of <code>draw()</code> wipes the last frame.</li>
			<li><code>fill(r, g, b)</code> sets the color for the next shapes, with each number from 0-255 for red, green, and blue.</li>
			<li><code>noStroke()</code> turns off outlines.</li>
			<li><code>ellipse(x, y, w, h)</code> draws a circle or oval centered at (x, y).</li>
			<li><code>rect(x, y, w, h)</code> draws a rectangle from its top-left corner.</li>
		</ul>
		{@render withPreview(shapesCode, previews.shapes, '')}
		<div class="note"><i class="ph-bold ph-lightbulb"></i><span><b>Try it:</b> move the moon by changing <code>400, 60</code>, or change the fill numbers to make a blood-red moon.</span></div>
	</section>

	<section class="step" id="ghost">
		<h2><span class="num">4</span>Draw your creature</h2>
		<p>Now make a drawing of your own and put it inside a <b>function</b> with <code>x</code> and <code>y</code> parameters, so you can draw it anywhere, as many times as you want, with one line.</p>
		<p>Every shape inside uses <code>x</code> and <code>y</code> as its starting point, so the eyes move with the body.</p>
		{@render withPreview(ghostCode, previews.creature, 'zoomed in on the top-left')}
		<div class="note"><i class="ph-bold ph-paint-brush"></i><span><b>Your turn:</b> make it yours by adding a mouth with another <code>ellipse()</code>, giving it a hat with <code>rect()</code>, or changing its color. Keep the body about 60 pixels wide, since the click check later expects that.</span></div>
	</section>

	<section class="step" id="move">
		<h2><span class="num">5</span>Make it move randomly</h2>
		<p><code>random(a, b)</code> gives you a different number between <code>a</code> and <code>b</code> every time you call it, which is the key to anything unpredictable.</p>
		<p>First, store the ghost's position in a <b>variable</b> so it can change between frames. <code>{'{ x: 240, y: 180 }'}</code> is an <b>object</b>, which lets one variable hold both numbers.</p>
		<h3>Option A: haunted drift</h3>
		<p>Nudge the ghost a random amount every frame so it shivers and wanders around like it's possessed.</p>
		{@render withPreview(wobbleCode, previews.drift, '')}
		<h3>Option B: teleport</h3>
		<p>This is what Ghost Hunt does: every 60 frames (about one second), the ghost jumps to a random spot. <code>frameCount</code> counts frames since the start, and <code>%</code> gives the remainder of a division, so <code>frameCount % 60 === 0</code> is true once every 60 frames.</p>
		{@render withPreview(spawnCode, previews.teleport, '')}
		<div class="note"><i class="ph-bold ph-lightbulb"></i><span>The <code>40</code> and <code>width - 40</code> keep the ghost from spawning half off the edge, and your <code>drawGhost()</code> function from step 4 stays at the bottom of the file.</span></div>
	</section>

	<section class="step" id="click">
		<h2><span class="num">6</span>Click to score</h2>
		<p>p5.js calls <code>mousePressed()</code> every time you click, and <code>mouseX</code> and <code>mouseY</code> hold where the click happened.</p>
		<p><code>dist()</code> measures the distance between two points. Since the ghost is 60 pixels wide, its radius is 30, so any click closer than 30 pixels to its center is a hit, and an <code>if</code> statement runs code only when that's true.</p>
		{@render withPreview(clickCode, previews.click, 'click the ghost')}
		<div class="note"><i class="ph-bold ph-cursor-click"></i><span><b>Try it:</b> click the ghost a few times and watch the score go up as the ghost jumps somewhere new.</span></div>
	</section>

	<section class="step" id="timer">
		<h2><span class="num">7</span>Add a timer</h2>
		<p><code>millis()</code> is how many milliseconds have passed since the sketch started (1000 ms = 1 second), so you can save it when the round begins and subtract to see how long the round has lasted.</p>
		{@render withPreview(timerCode, previews.timer, 'click the ghost')}
	</section>

	<section class="step" id="together">
		<h2><span class="num">8</span>Put it together</h2>
		<p>One last idea: a <code>state</code> variable decides what the screen shows: <code>'start'</code> shows a title, <code>'play'</code> runs the game, and <code>'over'</code> shows your score, with a click moving between them.</p>
		<p>Here's the complete game, piece by piece. Clear the editor, then copy each piece in, top to bottom:</p>
		{@render withPreview(finalCode, previews.full, 'click to play')}
		<div class="done">
			<i class="ph-bold ph-ghost"></i>
			<div>
				<b>That's Ghost Hunt</b>, with a start screen, clicking to score, a countdown, game over, and retry. It's exactly the game on the <a href="/play/">Play page</a>, so now make it yours.
			</div>
		</div>
	</section>

	<section class="step" id="unique">
		<h2><span class="num">9</span>Make it unique</h2>
		<p>Now it's time to <b>do your own thing</b>! We want you to learn and try new things on your own, and it's no fun if you copy it from the guide or from AI. Here are some ideas to get you started:</p>
		<div class="ideas">
			<article class="idea">
				<i class="ph-bold ph-skull"></i>
				<h3>Your own enemies</h3>
				<p>Swap the ghost for a bat, a skeleton, a witch, an eyeball, or something you made up, built from <code>ellipse()</code>, <code>rect()</code>, <code>triangle()</code>, and <code>arc()</code>, and try mixing 2-3 different ones.</p>
			</article>
			<article class="idea">
				<i class="ph-bold ph-palette"></i>
				<h3>Your own colors</h3>
				<p>Pick a palette and stick to it: toxic swamp green, blood-red moon, candy-corn orange, or icy blue, then change every <code>fill()</code> and <code>background()</code> to match.</p>
			</article>
			<article class="idea">
				<i class="ph-bold ph-text-aa"></i>
				<h3>Your own font</h3>
				<p>Use <code>textFont('Georgia')</code> or another font, plus <code>textStyle(BOLD)</code> and a bigger <code>textSize()</code> for your title.</p>
			</article>
			<article class="idea">
				<i class="ph-bold ph-tree"></i>
				<h3>Your own scene</h3>
				<p>Draw a graveyard with tombstones, a haunted house, a full moon, stars, or fog instead of a plain background.</p>
			</article>
			<article class="idea">
				<i class="ph-bold ph-book-open-text"></i>
				<h3>Your own story</h3>
				<p>Give it a name and a reason to click, like catching bats before sunrise, feeding candy to a monster, or zapping zombies off your lawn, and put it on the start screen.</p>
			</article>
			<article class="idea">
				<i class="ph-bold ph-sliders"></i>
				<h3>Your own rules</h3>
				<p>Change the timer, the ghost size, how fast it jumps, or what counts as a point, or add a creature that loses you points if you click it.</p>
			</article>
		</div>

		<h3 class="features-title">Features to add</h3>
		<p>Here are some additional features you can add! There's no code to copy here: each one points you to the p5.js docs and an example you can open, play with, and figure out for your own game. Want to see them all in action? Try the <a href="/demo/">expanded demo</a>, or pick apart the <a href="https://p5js.org/examples/Games-Circle-Clicker/" target="_blank" rel="noopener">Circle Clicker</a> example.</p>
		<div class="tools">
			{#each features as feature}
				<article class="tool">
					<div class="tool-head"><h3>{feature.title}</h3><span class="tag">1-2 hours</span></div>
					<p>{feature.desc}</p>
					<div class="refs">
						<span class="ref-label">Docs:</span>
						{#each feature.docs as doc}
							<a href={doc.url} target="_blank" rel="noopener"><code>{doc.name}</code></a>
						{/each}
					</div>
					<div class="refs">
						<span class="ref-label">Example:</span>
						<a href={feature.example.url} target="_blank" rel="noopener">{feature.example.name}<i class="ph-bold ph-arrow-up-right"></i></a>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="step" id="extra">
		<h2><span class="num">10</span>Already done?</h2>
		<p>Your base game works? Try these extra things to get a <b>sticker sheet</b> and <b>more money for candy</b>!</p>
		<div class="bonus-grid">
			<article class="bonus-card">
				<div class="tool-head"><h3><i class="ph-bold ph-paint-brush"></i>Bonus 1: Custom art &amp; sound</h3></div>
				<p>Give your effects your own art, add your own sound effects, or both, like a burst you drew for when a ghost is caught or a "boo" you recorded yourself.</p>
			</article>
			<article class="bonus-card">
				<div class="tool-head"><h3><i class="ph-bold ph-stairs"></i>Bonus 2: Two more levels</h3></div>
				<p>Add two extra levels that each get harder than the last, by making the ghost faster, giving less time, adding more ghosts, or throwing in something new to dodge.</p>
			</article>
		</div>
		<div class="rewards">
			<div class="reward"><i class="ph-bold ph-sticker"></i><StickerSheet /></div>
			<div class="reward"><i class="ph-bold ph-gift"></i><span><b>Finish both:</b> the sticker sheet and $10 total for candy!</span></div>
		</div>

		<p><a href="/bonus/"><b>Open the bonus page</b></a> for hints, docs, and tools for each challenge.</p>

		<h3>Explore the p5.js docs</h3>
		<p>The <a href="https://p5js.org/reference/" target="_blank" rel="noopener">p5.js reference</a> lists every function with examples you can try, so look up these 5 and use 1-2 of them in your game:</p>
		<ul class="docs">
			<li><a href="https://p5js.org/reference/p5/loadImage/" target="_blank" rel="noopener"><code>loadImage()</code></a> and <a href="https://p5js.org/reference/p5/image/" target="_blank" rel="noopener"><code>image()</code></a>: draw your own picture instead of shapes.</li>
			<li><a href="https://p5js.org/reference/p5/rotate/" target="_blank" rel="noopener"><code>rotate()</code></a>: spin or tilt your creature.</li>
			<li><a href="https://p5js.org/reference/p5/noise/" target="_blank" rel="noopener"><code>noise()</code></a>: smooth, floaty movement that's less jittery than <code>random()</code>.</li>
			<li><a href="https://p5js.org/reference/p5/lerpColor/" target="_blank" rel="noopener"><code>lerpColor()</code></a>: fade between two colors, like a sky turning blood red.</li>
			<li><a href="https://p5js.org/reference/p5/keyIsDown/" target="_blank" rel="noopener"><code>keyIsDown()</code></a>: add keyboard controls.</li>
		</ul>
	</section>

	<section class="step" id="checklist">
		<h2><span class="num">11</span>Checklist &amp; submit</h2>
		<ul class="checks">
			<li><i class="ph-bold ph-check-square"></i>It's made with p5.js and is a full playable game</li>
			<li><i class="ph-bold ph-check-square"></i>It has a start screen, gameplay, and a game-over screen</li>
			<li><i class="ph-bold ph-check-square"></i>It's Halloween themed, with your own spooky creatures</li>
			<li><i class="ph-bold ph-check-square"></i>It looks like your own game, not a copy of the guide</li>
			<li><i class="ph-bold ph-check-square"></i>You wrote it yourself, using AI only to unblock a single line</li>
		</ul>
		<div class="cta">
			<a class="btn ghost" href="/requirements/"><i class="ph-bold ph-list-checks"></i>Read the full requirements before submitting</a>
		</div>
		<div class="tabs" role="tablist">
			<button type="button" role="tab" aria-selected={track === 'individual'} class:active={track === 'individual'} onclick={() => (track = 'individual')}>
				<i class="ph-bold ph-user"></i>Submitting as an individual
			</button>
			<button type="button" role="tab" aria-selected={track === 'workshop'} class:active={track === 'workshop'} onclick={() => (track = 'workshop')}>
				<i class="ph-bold ph-users-three"></i>Submitting from a workshop
			</button>
		</div>

		{#if track === 'workshop'}
			<div class="panel" role="tabpanel">
				<p>Once your game is finished in the p5.js web editor, here's how to share it:</p>
				<ol class="howto">
					<li>Make sure you're logged in, then click <b>File → Save</b> so your latest changes are saved.</li>
					<li>Click <b>File → Share</b> and copy the <b>Edit</b> link, which shows your code and lets anyone press ▶ to play.</li>
					<li>Open the link in a new tab to check that the game loads and plays.</li>
					<li>Paste the link into your club's submission form, or send it to your club leader.</li>
				</ol>
				<div class="note"><i class="ph-bold ph-lightbulb"></i><span>Built your game in VS Code instead? Switch to <b>Submitting as an individual</b>, follow the VS Code steps to put it on GitHub Pages, and give your club leader that link.</span></div>
			</div>
		{:else}
			<div class="panel" role="tabpanel">
				<p>On your own, you share your game by putting your code on GitHub and turning it into a live website with GitHub Pages, so anyone can play it from a link. Both are free, and the steps depend on where you built your game:</p>
				<p>First, make a free account on <a href="https://github.com/" target="_blank" rel="noopener">github.com</a>.</p>
				{@render toolTabs()}
				{#if tool === 'lapse'}
					<ol class="howto">
						<li>In the p5.js editor, click <b>File → Download</b> and unzip the file.</li>
						<li>On github.com, click <b>+ → New repository</b>, give it a name, make it <b>Public</b>, and click <b>Create repository</b>.</li>
						<li>Click <b>uploading an existing file</b>, drag in everything from the unzipped folder (<code>index.html</code>, <code>sketch.js</code>, and the rest), and click <b>Commit changes</b>.</li>
						{@render pagesSteps()}
					</ol>
					<div class="note"><i class="ph-bold ph-lightbulb"></i><span>Changed something? Download it again and upload the new files to your repo, and your live link will update about a minute later.</span></div>
				{:else}
					<ol class="howto">
						<li>In VS Code, open <b>Source Control</b> (<code>Ctrl+Shift+G</code>) and click <b>Initialize Repository</b>.</li>
						<li>Type a message like <code>first version</code> and click <b>Commit</b>, and if it asks to stage your changes, click <b>Yes</b>.</li>
						<li>Click <b>Publish Branch</b>, sign in to GitHub, and pick <b>Publish to GitHub public repository</b>, and VS Code will make the repo and upload your code.</li>
						{@render pagesSteps()}
					</ol>
					<div class="note"><i class="ph-bold ph-lightbulb"></i><span>Changed something? <b>Commit</b>, then click <b>Sync Changes</b>, and your live link will update about a minute later. Keep <code>index.html</code> in the top of your folder, not in a subfolder, or Pages shows a 404 page.</span></div>
				{/if}
				<div class="cta">
					<a class="btn primary" href={SUBMIT_URL}><i class="ph-bold ph-rocket-launch"></i>Submit your game</a>
					{#if tool === 'lapse'}
						<a class="btn ghost" href="https://lapse.hackclub.com" target="_blank" rel="noopener"><i class="ph-bold ph-video-camera"></i>Open Lapse</a>
					{:else}
						<a class="btn ghost" href="https://hackatime.hackclub.com" target="_blank" rel="noopener"><i class="ph-bold ph-clock"></i>Set up Hackatime</a>
					{/if}
				</div>
			</div>
		{/if}
	</section>
	</div>
	</div>
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
		max-width: 1240px;
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
	.layout {
		display: grid;
		grid-template-columns: 220px minmax(0, 1fr);
		gap: 28px;
		align-items: start;
	}
	.toc {
		position: sticky;
		top: 16px;
		max-height: calc(100vh - 32px);
		overflow-y: auto;
		background: var(--panel);
		border: 1px solid var(--panel-line);
		border-radius: 12px;
		padding: 14px 10px;
	}
	.toc .label {
		display: block;
		padding: 0 10px 8px;
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--parchment-dim);
	}
	.toc ol {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 2px;
	}
	.toc a {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 7px 10px;
		border-radius: 8px;
		color: var(--parchment-dim);
		text-decoration: none;
		font-size: 14px;
		line-height: 1.3;
	}
	.toc a:hover {
		color: var(--parchment);
		background: rgba(255, 255, 255, 0.04);
	}
	.toc a.active {
		color: var(--parchment);
		background: rgba(255, 143, 63, 0.12);
	}
	.toc .n {
		flex: none;
		width: 22px;
		height: 22px;
		display: grid;
		place-items: center;
		border-radius: 50%;
		font-size: 12px;
		font-weight: 700;
		border: 1px solid var(--panel-line);
	}
	.toc a.active .n {
		background: var(--pumpkin);
		border-color: var(--pumpkin);
		color: #241505;
	}
	@media (max-width: 1000px) {
		.layout {
			grid-template-columns: 1fr;
		}
		.toc {
			position: static;
			max-height: none;
		}
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
	.ideas {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 12px;
	}
	.idea {
		border: 1px solid var(--panel-line);
		border-radius: 10px;
		padding: 16px 18px;
		background: var(--night);
	}
	.idea > i {
		font-size: 24px;
		color: var(--pumpkin);
	}
	.idea h3 {
		margin: 6px 0 0;
	}
	.step .idea p {
		margin: 6px 0 0;
	}
	.bonus-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 12px;
	}
	.bonus-card {
		border: 1px solid var(--panel-line);
		border-radius: 10px;
		padding: 16px 18px;
		background: var(--night);
	}
	.bonus-card h3 {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 0;
	}
	.bonus-card h3 i {
		color: var(--pumpkin);
	}
	.step .bonus-card p {
		margin: 8px 0 0;
	}
	.rewards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 12px;
		margin: 12px 0 24px;
	}
	.reward {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 16px;
		border: 1px dashed var(--pumpkin);
		border-radius: 10px;
		color: var(--parchment-dim);
	}
	.reward i {
		color: var(--pumpkin);
		font-size: 1.3rem;
	}
	.reward b {
		color: var(--parchment);
	}
	.docs a {
		color: var(--pumpkin);
	}
	.features-title {
		margin-top: 28px;
	}
	.refs {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px 10px;
		margin-top: 10px;
		font-size: 14px;
	}
	.ref-label {
		font-weight: 700;
		color: var(--parchment);
	}
	.refs a {
		display: inline-flex;
		align-items: center;
		gap: 4px;
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
		.step {
			padding: 20px 18px;
		}
	}
</style>
