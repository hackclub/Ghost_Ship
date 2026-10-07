<script>
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
</script>

<svelte:head>
	<title>Ghost Ship | Requirements</title>
</svelte:head>

<div class="page">

<SiteHeader current="requirements" />

<main>
	<header class="intro">
		<h1>Requirements</h1>
		<p>Here's what your game needs to get candy.</p>
	</header>

	<section class="block">
		<h2><i class="ph-bold ph-check-circle"></i>Your game must</h2>
		<ul>
			<li>Be made with only p5.js!</li>
			<li>Be playable through a demo link.</li>
			<li>Be Halloween themed, with your own monster(s).</li>
			<li>Doing it on your own? Track your time with <a href="https://hackatime.hackclub.com" target="_blank" rel="noopener">Hackatime</a>.</li>
		</ul>
	</section>

	<section class="block bonus">
		<h2><i class="ph-bold ph-star"></i>Bonus challenges</h2>
		<p class="sub">Optional. Finish them on top of the requirements above to earn extra rewards.</p>
		<div class="bonus-grid">
			<article class="bonus-card">
				<span class="tag">Bonus 1</span>
				<h3><i class="ph-bold ph-paint-brush"></i>Custom art &amp; sound</h3>
				<p>Give your effects your own art, add your own sound effects, or both. For example: a burst you drew when a ghost is caught, or a "boo" you recorded yourself.</p>
			</article>
			<article class="bonus-card">
				<span class="tag">Bonus 2</span>
				<h3><i class="ph-bold ph-stairs"></i>Two more levels</h3>
				<p>Add two extra levels, each harder than the last. Make the ghost faster, give less time, add more ghosts, or throw in something new to dodge.</p>
			</article>
		</div>
		<div class="rewards">
			<div class="reward"><i class="ph-bold ph-sticker"></i><span><b>Finish 1 bonus:</b> a sticker sheet</span></div>
			<div class="reward"><i class="ph-bold ph-gift"></i><span><b>Finish both:</b> the sticker sheet + another $5 for candy</span></div>
		</div>
	</section>

	<div class="cta">
		<a class="btn primary" href="/tutorial/"><i class="ph-bold ph-book-open"></i>Start the guide</a>
		<a class="btn ghost" href="/submit/"><i class="ph-bold ph-rocket-launch"></i>Submit your game</a>
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
		max-width: 820px;
		margin: 0 auto;
		padding: clamp(24px, 5vh, 56px) 20px 56px;
	}
	.intro {
		margin-bottom: 28px;
	}
	h1 {
		font-family: var(--font-display);
		font-size: clamp(2.6rem, 6vw, 3.8rem);
		line-height: 1.05;
		margin: 0 0 12px;
	}
	.intro p:last-child {
		color: var(--parchment-dim);
		font-size: 1.1rem;
		line-height: 1.6;
		margin: 0;
		max-width: 60ch;
	}
	.block {
		background: var(--panel);
		border: 1px solid var(--panel-line);
		border-radius: 12px;
		padding: 22px 26px;
		margin-bottom: 16px;
	}
	.block h2 {
		display: flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-display);
		font-size: 1.45rem;
		margin: 0 0 12px;
	}
	.block h2 i {
		color: var(--pumpkin);
	}
	ul {
		margin: 0;
		padding-left: 20px;
		display: grid;
		gap: 8px;
		color: var(--parchment-dim);
		line-height: 1.6;
	}
	ul a {
		color: var(--pumpkin);
	}
	.sub {
		margin: 0 0 16px;
		color: var(--parchment-dim);
		line-height: 1.6;
	}
	.bonus-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 12px;
	}
	.bonus-card {
		border: 1px solid var(--panel-line);
		border-radius: 10px;
		padding: 16px 18px;
		background: var(--night);
	}
	.bonus-card .tag {
		display: inline-block;
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--mint);
		margin-bottom: 6px;
	}
	.bonus-card h3 {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 0 0 8px;
		font-size: 1.1rem;
	}
	.bonus-card h3 i {
		color: var(--pumpkin);
	}
	.bonus-card p {
		margin: 0;
		color: var(--parchment-dim);
		line-height: 1.6;
	}
	.rewards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 12px;
		margin-top: 12px;
	}
	.reward {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 16px;
		border: 1px dashed var(--pumpkin);
		border-radius: 10px;
		color: var(--parchment-dim);
		line-height: 1.5;
	}
	.reward i {
		color: var(--pumpkin);
		font-size: 1.3rem;
	}
	.reward b {
		color: var(--parchment);
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
