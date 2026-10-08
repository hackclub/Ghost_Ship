<script>
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';

	const examples = [
		{
			title: 'Ghost Hunt',
			href: '/play/',
			icon: 'ph-ghost',
			desc: 'The base game from the guide. Click the ghost as many times as you can before the 30-second timer runs out.'
		},
		{
			title: 'Ghost Hunt: full demo',
			href: '/demo/',
			icon: 'ph-sparkle',
			desc: 'A bigger version with pumpkins, candy, and bats, 3 lives, sound effects, particle bursts, and a high score.'
		}
	];
</script>

<svelte:head>
	<title>Ghost Ship | Examples</title>
</svelte:head>

<div class="page">

<SiteHeader />

<main>
	<header class="intro">
		<h1>Examples</h1>
		<p>Play these for ideas, then make something of your own.</p>
	</header>

	<div class="choices">
		{#each examples as ex}
			<a class="choice" href={ex.href}>
				<i class="ph-bold {ex.icon}"></i>
				<h2>{ex.title}</h2>
				<p>{ex.desc}</p>
				<span class="go">Play<i class="ph-bold ph-arrow-right"></i></span>
			</a>
		{/each}
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
