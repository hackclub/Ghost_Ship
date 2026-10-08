<script>
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';

	const faqs = [
		{
			q: 'Is Hack Club real? Is this legit?',
			a: 'Yup! <a href="https://hackclub.com" target="_blank" rel="noopener">Hack Club</a> is a <a href="https://the.hackfoundation.org/" target="_blank" rel="noopener">501(c)(3) nonprofit</a> that has run programs like High Seas, Summer of Making, and Horizons for thousands of teenagers.'
		},
		{
			q: 'What is Hack Club?',
			a: 'A global community of teenagers who code, with clubs at schools around the world and an online community on <a href="https://hackclub.com/slack" target="_blank" rel="noopener">Slack</a>.'
		},
		{
			q: 'Who can participate?',
			a: 'Anyone 18 or under, at any skill level.'
		},
		{
			q: "I've never coded before. Can I still join?",
			a: "Yes! The <a href=\"/tutorial/\">guide</a> assumes you've never used p5.js and walks you from a blank canvas to a finished game."
		},
		{
			q: 'Do I need a club to take part?',
			a: 'Nope! Build it on your own and send it in as an <a href="/submit/">individual submission</a>, or <a href="/jam/">run a workshop</a> at your club.'
		},
		{
			q: 'Do I need to install anything?',
			a: 'Nope, everything runs in the <a href="https://editor.p5js.org/" target="_blank" rel="noopener">p5.js Web Editor</a> in your browser.'
		},
		{
			q: 'Can I use AI?',
			a: "For unblocking a single line, sure, but not for writing your game or your upgrades, because the point is that you built the thing you're showing off."
		},
		{
			q: 'How do I get candy?',
			a: "At a club meeting, your club leader hands it out at the showcase, and on your own, we'll get you candy once your submitted game is reviewed."
		},
		{
			q: 'Can I earn more than candy?',
			a: 'Yes. Finish one <a href="/requirements/">bonus challenge</a> for a sticker sheet, or both for the sticker sheet and $10 total for candy.'
		},
		{
			q: 'Is it safe? What if my parents have questions?',
			a: 'Hack Club takes safety seriously: read the <a href="https://hackclub.com/safeguarding-policy" target="_blank" rel="noopener">safeguarding policy</a>. For anything else, ask on the <a href="https://hackclub.com/slack" target="_blank" rel="noopener">Hack Club Slack</a>.'
		}
	];
</script>

<svelte:head>
	<title>Ghost Ship | FAQ</title>
</svelte:head>

<div class="page">

<SiteHeader current="faq" />

<main>
	<header class="intro">
		<h1>FAQ</h1>
		<p>Questions people ask before they start building.</p>
	</header>

	{#each faqs as item}
		<details>
			<summary>{item.q}<i class="ph-bold ph-caret-down"></i></summary>
			<p>{@html item.a}</p>
		</details>
	{/each}
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
	details {
		background: var(--panel);
		border: 1px solid var(--panel-line);
		border-radius: 12px;
		margin-bottom: 10px;
	}
	details[open] {
		border-color: var(--pumpkin);
	}
	summary {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		padding: 16px 20px;
		font-weight: 700;
		font-size: 16px;
		cursor: pointer;
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary i {
		color: var(--pumpkin);
		transition: transform 0.2s;
		flex-shrink: 0;
	}
	details[open] summary i {
		transform: rotate(180deg);
	}
	details p {
		margin: 0;
		padding: 0 20px 16px;
		color: var(--parchment-dim);
		line-height: 1.6;
	}
	details p :global(a) {
		color: var(--pumpkin);
	}
</style>
