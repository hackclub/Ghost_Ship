<script>
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import StickerSheet from '$lib/StickerSheet.svelte';

	const bonuses = [
		{
			id: 'art-sound',
			num: 1,
			icon: 'ph-paint-brush',
			title: 'Custom art & sound',
			goal: 'Give your effects your own art, add your own sound effects, or both.',
			hints: [
				'Draw sprites or effects in a pixel art tool, export them as PNGs, and upload them to your sketch.',
				'Record or generate your own sound effects, then play one when something happens, like catching a ghost.',
				'Browsers block sound until the player clicks, so start audio after the first click.',
				'In the p5.js web editor, upload files from the sketch file list: click the arrow on the left, then + and Upload file.'
			],
			groups: [
				{
					label: 'p5.js reference',
					links: [
						{ name: 'loadImage()', url: 'https://p5js.org/reference/p5/loadImage/' },
						{ name: 'image()', url: 'https://p5js.org/reference/p5/image/' },
						{ name: 'imageMode()', url: 'https://p5js.org/reference/p5/imageMode/' },
						{ name: 'tint()', url: 'https://p5js.org/reference/p5/tint/' },
						{ name: 'p5.sound library', url: 'https://p5js.org/reference/p5.sound/' },
						{ name: 'p5.SoundFile', url: 'https://p5js.org/reference/p5.sound/p5.SoundFile/' },
						{ name: 'userStartAudio()', url: 'https://p5js.org/reference/p5/userStartAudio/' }
					]
				},
				{
					label: 'Make your own assets',
					links: [
						{ name: 'Piskel: pixel art in the browser', url: 'https://www.piskelapp.com/' },
						{ name: 'sfxr: generate retro sound effects', url: 'https://sfxr.me/' },
						{ name: 'Audacity: record and edit audio', url: 'https://www.audacityteam.org/' }
					]
				}
			]
		},
		{
			id: 'levels',
			num: 2,
			icon: 'ph-stairs',
			title: 'Two more levels',
			goal: 'Add two extra levels, each harder than the last.',
			hints: [
				'Keep a level variable, and move to the next level when the player reaches a target score.',
				'Store each level\'s settings (time, ghost speed, how many ghosts, how often they jump) in an array of objects, so a new level is one more entry.',
				'Show the level number on screen, and a short "Level 2!" message between levels.',
				'Harder can mean faster, smaller, more of them, less time, or something new to avoid.'
			],
			groups: [
				{
					label: 'p5.js reference',
					links: [
						{ name: 'millis()', url: 'https://p5js.org/reference/p5/millis/' },
						{ name: 'random()', url: 'https://p5js.org/reference/p5/random/' },
						{ name: 'lerp()', url: 'https://p5js.org/reference/p5/lerp/' },
						{ name: 'push() / pop()', url: 'https://p5js.org/reference/p5/push/' },
						{ name: 'textFont()', url: 'https://p5js.org/reference/p5/textFont/' }
					]
				},
				{
					label: 'JavaScript basics',
					links: [
						{ name: 'Arrays (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array' },
						{ name: 'Objects (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics' }
					]
				}
			]
		}
	];

	const general = [
		{ name: 'p5.js reference', desc: 'Every function, with live examples.', url: 'https://p5js.org/reference/' },
		{ name: 'p5.js examples', desc: 'Small finished sketches to learn from.', url: 'https://p5js.org/examples/' },
		{ name: 'p5.js tutorials', desc: 'Longer step-by-step lessons.', url: 'https://p5js.org/tutorials/' },
		{ name: 'The Coding Train', desc: 'Video lessons on p5.js.', url: 'https://thecodingtrain.com/tracks/code-programming-with-p5-js' }
	];
</script>

<svelte:head>
	<title>Ghost Ship | Bonus</title>
</svelte:head>

<div class="page">

<SiteHeader />

<main>
	<header class="intro">
		<h1>Bonus challenges</h1>
		<p>Finished the base game? These challenges are on you, so there's no step-by-step code here, just the goal, a few hints, and the docs and tools you'll need for each one.</p>
	</header>

	<div class="rewards">
		<div class="reward"><i class="ph-bold ph-sticker"></i><StickerSheet /></div>
		<div class="reward"><i class="ph-bold ph-gift"></i><span><b>Finish both:</b> the sticker sheet and $10 total for candy!</span></div>
	</div>

	{#each bonuses as bonus}
		<section class="block" id={bonus.id}>
			<div class="head">
				<h2><i class="ph-bold {bonus.icon}"></i>Bonus {bonus.num}: {bonus.title}</h2>

			</div>
			<p class="goal"><b>Goal:</b> {bonus.goal}</p>

			<h3>Hints</h3>
			<ul class="hints">
				{#each bonus.hints as hint}
					<li>{hint}</li>
				{/each}
			</ul>

			<div class="groups">
				{#each bonus.groups as group}
					<div class="group">
						<h3>{group.label}</h3>
						<ul class="links">
							{#each group.links as link}
								<li><a href={link.url} target="_blank" rel="noopener">{link.name}<i class="ph-bold ph-arrow-up-right"></i></a></li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>
	{/each}

	<section class="block">
		<h2><i class="ph-bold ph-books"></i>Everything else</h2>
		<div class="general">
			{#each general as item}
				<a class="card" href={item.url} target="_blank" rel="noopener">
					<b>{item.name}<i class="ph-bold ph-arrow-up-right"></i></b>
					<span>{item.desc}</span>
				</a>
			{/each}
		</div>
		<p class="help">Stuck? Ask in the <a href="https://slack.hackclub.com/" target="_blank" rel="noopener">Hack Club Slack</a>.</p>
	</section>

	<div class="cta">
		<a class="btn primary" href="/submit/"><i class="ph-bold ph-rocket-launch"></i>Submit your game</a>
		<a class="btn ghost" href="/tutorial/"><i class="ph-bold ph-book-open"></i>Back to the guide</a>
	</div>
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
	}
	main {
		flex: 1;
		width: 100%;
		max-width: 860px;
		margin: 0 auto;
		padding: clamp(24px, 5vh, 56px) 20px 56px;
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
	.intro p {
		color: var(--parchment-dim);
		font-size: 1.1rem;
		line-height: 1.6;
		margin: 0;
	}
	.rewards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 12px;
		margin-bottom: 16px;
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
	.block {
		background: var(--panel);
		border: 1px solid var(--panel-line);
		border-radius: 12px;
		padding: 22px 26px;
		margin-bottom: 16px;
	}
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		flex-wrap: wrap;
	}
	.block h2 {
		display: flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-display);
		font-size: 1.5rem;
		margin: 0;
	}
	.block h2 i {
		color: var(--pumpkin);
	}
	.tag {
		font-size: 12px;
		color: var(--mint);
		border: 1px solid var(--panel-line);
		border-radius: 999px;
		padding: 2px 10px;
	}
	.goal {
		margin: 12px 0 0;
		color: var(--parchment-dim);
		line-height: 1.6;
	}
	.goal b {
		color: var(--parchment);
	}
	h3 {
		margin: 18px 0 8px;
		font-size: 13px;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--mint);
	}
	.hints {
		margin: 0;
		padding-left: 20px;
		display: grid;
		gap: 6px;
		color: var(--parchment-dim);
		line-height: 1.6;
	}
	.groups {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 0 24px;
	}
	.links {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 6px;
	}
	.links a,
	.help a {
		color: var(--pumpkin);
	}
	.links a {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		text-decoration: none;
	}
	.links a:hover {
		text-decoration: underline;
	}
	.links i,
	.card i {
		font-size: 12px;
	}
	.general {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 12px;
		margin-top: 14px;
	}
	.card {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 14px 16px;
		border: 1px solid var(--panel-line);
		border-radius: 10px;
		background: var(--night);
		text-decoration: none;
		color: var(--parchment-dim);
		font-size: 14px;
		line-height: 1.5;
	}
	.card b {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		color: var(--parchment);
		font-size: 15px;
	}
	.card:hover {
		border-color: var(--pumpkin);
	}
	.help {
		margin: 14px 0 0;
		color: var(--parchment-dim);
	}
	.cta {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
		margin-top: 24px;
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
</style>
