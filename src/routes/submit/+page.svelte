<script>
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { SUBMIT_URL, WORKSHOP_SUBMIT_URL } from '$lib/links.js';
</script>

<svelte:head>
	<title>Ghost Ship | Submit</title>
</svelte:head>

<div class="page">

<SiteHeader current="submit" />

<main>
	<header class="intro">
		<h1>Submit your game</h1>
		<p>Check the <a href="/requirements/">requirements</a> first, then pick the form that matches how you built your game.</p>
	</header>

	<div class="choices">
		<a class="choice" href={SUBMIT_URL}>
			<i class="ph-bold ph-user"></i>
			<h2>Individual</h2>
			<p>You built your game on your own, so include your demo link and your tracked time.</p>
			<span class="go">Individual form<i class="ph-bold ph-arrow-right"></i></span>
		</a>
		<a class="choice" href={WORKSHOP_SUBMIT_URL}>
			<i class="ph-bold ph-users-three"></i>
			<h2>Workshop</h2>
			<p>You built your game at a club meeting, and your club leader can send in everyone's games together.</p>
			<span class="go">Workshop form<i class="ph-bold ph-arrow-right"></i></span>
		</a>
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
	.intro p {
		color: var(--parchment-dim);
		font-size: 1.1rem;
		line-height: 1.6;
		margin: 0;
	}
	.intro a {
		color: var(--pumpkin);
	}
	.choices {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 16px;
	}
	.choice {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 24px;
		background: var(--panel);
		border: 1px solid var(--panel-line);
		border-radius: 12px;
		color: var(--parchment);
		text-decoration: none;
		transition: border-color 0.15s;
	}
	.choice:hover {
		border-color: var(--pumpkin);
	}
	.choice > i {
		font-size: 28px;
		color: var(--pumpkin);
	}
	.choice h2 {
		font-family: var(--font-display);
		font-size: 1.6rem;
		margin: 0;
	}
	.choice p {
		margin: 0;
		flex: 1;
		color: var(--parchment-dim);
		line-height: 1.6;
	}
	.go {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-weight: 700;
		color: var(--pumpkin);
	}
</style>
