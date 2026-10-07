<script>
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { SUBMIT_URL } from '$lib/links.js';
</script>

<svelte:head>
	<title>Ghost Ship | Home</title>
</svelte:head>

<div class="page">

<SiteHeader />

<main>
	<section class="hero">
		<div class="hero-sticker">
			<img src="/media/IMG_0398.png" alt="Ghost Ship ghost sticker" />
		</div>
		<div class="hero-copy">
			<p class="eyebrow">A Hack Club clubs event!</p>
			<h1>Build a <span class="word">sp<span class="orbit"><span class="haunt" style="--i: 0">o</span><span class="haunt" style="--i: 1">o</span><span class="haunt" style="--i: 2">o</span><span class="haunt" style="--i: 3">o</span><span class="haunt" style="--i: 4">o</span><span class="haunt" style="--i: 5">o</span><span class="haunt" style="--i: 6">o</span><span class="haunt" style="--i: 7">o</span></span>ky</span> game.<br />Get <span class="highlight">candy!</span></h1>
			<p class="intro">Make a Halloween-themed game in p5.js. Whether it's by yourself or in a club meeting, complete the guide and submit it to get $5 of Halloween candy!</p>
			<div class="cta">
				<a class="btn ghost" href="/tutorial/"><i class="ph-bold ph-book-open"></i>Guide</a>
				<a class="btn primary" href={SUBMIT_URL}><i class="ph-bold ph-rocket-launch"></i>Individual Submissions</a>
				<a class="btn ghost" href="/jam/"><i class="ph-bold ph-users-three"></i>Run a Workshop</a>
			</div>
		</div>
	</section>

	<section class="reqs" id="requirements">
		<h2>Requirements</h2>
		<ul>
			<li><i class="ph-bold ph-git-fork"></i>Start from the p5.js starter, not a blank sketch.</li>
			<li><i class="ph-bold ph-game-controller"></i>Playable end to end: start screen, play, game over.</li>
			<li><i class="ph-bold ph-ghost"></i>Ghost or Halloween-themed, with 1-3 upgrades of your own.</li>
			<li><i class="ph-bold ph-link"></i>Submit a working share link before the showcase.</li>
		</ul>
		<a class="btn primary" href="/requirements/"><i class="ph-bold ph-list-checks"></i>Full requirements</a>
	</section>
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
		display: flex;
		flex-direction: column;
		background: var(--night);
		color: var(--parchment);
		font-family: var(--font-body);
	}
	:global(a) {
		color: inherit;
	}


	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		padding: clamp(20px, 5vh, 56px) 20px;
	}
	.hero {
		width: 100%;
		max-width: 1100px;
		display: grid;
		grid-template-columns: 0.8fr 1.2fr;
		align-items: center;
		gap: 32px;
		margin-bottom: clamp(24px, 5vh, 48px);
	}
	.hero-sticker {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.hero-sticker img {
		width: min(360px, 100%);
		height: auto;
		display: block;
		transform: rotate(-6deg);
		filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.45));
	}
	.hero-copy {
		max-width: 620px;
	}
	.eyebrow {
		margin: 0 0 10px;
		color: var(--mint);
		font-size: 13px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}
	h1 {
		isolation: isolate;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(2.6rem, 6vw, 4.4rem);
		line-height: 1.05;
		margin: 0;
		text-wrap: balance;
	}
	h1 .highlight {
		color: var(--pumpkin);
	}
	.word {
		white-space: nowrap;
	}
	.orbit {
		position: relative;
		display: inline-block;
		width: 2.5em;
		height: 1em;
		vertical-align: baseline;
	}
	.haunt {
		position: absolute;
		left: calc(50% - 0.275em);
		bottom: -0.22em;
		display: inline-block;
		width: 0.55em;
		text-align: center;
		animation: orbit 6s linear infinite;
		animation-delay: calc(var(--i) * -0.75s);
	}
	@keyframes orbit {
		0.00% {
			transform: translate(1.000em, -0.120em) scale(0.820);
			opacity: 0.35;
			z-index: 1;
		}
		6.25% {
			transform: translate(0.924em, -0.074em) scale(0.889);
			opacity: 0.60;
			z-index: 1;
		}
		12.50% {
			transform: translate(0.707em, -0.035em) scale(0.947);
			opacity: 0.81;
			z-index: 1;
		}
		18.75% {
			transform: translate(0.383em, -0.009em) scale(0.986);
			opacity: 0.95;
			z-index: 1;
		}
		25.00% {
			transform: translate(0.000em, -0.000em) scale(1.000);
			opacity: 1.00;
			z-index: 1;
		}
		31.25% {
			transform: translate(-0.383em, -0.009em) scale(0.986);
			opacity: 0.95;
			z-index: 1;
		}
		37.50% {
			transform: translate(-0.707em, -0.035em) scale(0.947);
			opacity: 0.81;
			z-index: 1;
		}
		43.75% {
			transform: translate(-0.924em, -0.074em) scale(0.889);
			opacity: 0.60;
			z-index: 1;
		}
		50.00% {
			transform: translate(-1.000em, -0.120em) scale(0.820);
			opacity: 0.35;
			z-index: 1;
		}
		56.25% {
			transform: translate(-0.924em, -0.166em) scale(0.751);
			opacity: 0.29;
			z-index: -1;
		}
		62.50% {
			transform: translate(-0.707em, -0.205em) scale(0.693);
			opacity: 0.24;
			z-index: -1;
		}
		68.75% {
			transform: translate(-0.383em, -0.231em) scale(0.654);
			opacity: 0.21;
			z-index: -1;
		}
		75.00% {
			transform: translate(-0.000em, -0.240em) scale(0.640);
			opacity: 0.20;
			z-index: -1;
		}
		81.25% {
			transform: translate(0.383em, -0.231em) scale(0.654);
			opacity: 0.21;
			z-index: -1;
		}
		87.50% {
			transform: translate(0.707em, -0.205em) scale(0.693);
			opacity: 0.24;
			z-index: -1;
		}
		93.75% {
			transform: translate(0.924em, -0.166em) scale(0.751);
			opacity: 0.29;
			z-index: -1;
		}
		100.00% {
			transform: translate(1.000em, -0.120em) scale(0.820);
			opacity: 0.35;
			z-index: -1;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.haunt {
			animation: none;
			left: calc(var(--i) * 0.31em);
		}
	}
	.intro {
		color: var(--parchment-dim);
		margin: 18px 0 0;
		font-size: clamp(1rem, 2vw, 1.15rem);
		line-height: 1.6;
		max-width: 52ch;
	}
	.hero .cta {
		margin-top: 26px;
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}
	@media (max-width: 860px) {
		.hero {
			grid-template-columns: 1fr;
			text-align: center;
			gap: 20px;
		}
		.hero-sticker img {
			width: min(200px, 60%);
		}
		.hero-copy {
			margin: 0 auto;
		}
		.intro {
			margin-left: auto;
			margin-right: auto;
		}
		.hero .cta {
			justify-content: center;
		}
	}
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-body);
		font-size: 16px;
		font-weight: 700;
		text-decoration: none;
		padding: 13px 22px;
		border-radius: 999px;
		border: 2px solid var(--panel-line);
		background: var(--panel);
	}
	.btn i {
		font-size: 18px;
	}
	.btn.primary {
		background: var(--pumpkin);
		border-color: var(--pumpkin);
		color: #241505;
	}
	.btn.primary:hover {
		opacity: 0.9;
	}
	.btn.ghost {
		color: var(--parchment);
	}
	.btn.ghost:hover {
		border-color: var(--pumpkin);
		color: var(--pumpkin);
	}


	.reqs {
		width: 100%;
		max-width: 820px;
		margin-top: 32px;
		background: var(--panel);
		border: 1px solid var(--panel-line);
		border-top: 4px solid var(--pumpkin);
		border-radius: 12px;
		padding: 24px 26px;
	}
	.reqs h2 {
		font-family: var(--font-display);
		font-size: 1.6rem;
		margin: 0 0 12px;
	}
	.reqs ul {
		list-style: none;
		margin: 0 0 20px;
		padding: 0;
		display: grid;
		gap: 10px;
	}
	.reqs li {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		color: var(--parchment-dim);
		font-size: 15px;
	}
	.reqs li i {
		color: var(--mint);
		font-size: 18px;
		flex-shrink: 0;
	}
</style>
