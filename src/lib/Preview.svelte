<script>
	import { onMount } from 'svelte';

	let { sketch, hint = '' } = $props();
	let holder;

	onMount(() => {
		let instance;
		let observer;
		let alive = true;

		import('p5').then(({ default: p5 }) => {
			if (!alive) return;
			instance = new p5(sketch, holder);
			setTimeout(() => {
				if (!alive || !instance.isLooping()) return;
				observer = new IntersectionObserver(([entry]) => {
					if (entry.isIntersecting) instance.loop();
					else instance.noLoop();
				});
				observer.observe(holder);
			}, 0);
		});

		return () => {
			alive = false;
			observer?.disconnect();
			instance?.remove();
		};
	});
</script>

<figure class="preview">
	<div class="screen" bind:this={holder}></div>
	<figcaption><i class="ph-bold ph-eye"></i>What it looks like{#if hint}<span>{hint}</span>{/if}</figcaption>
</figure>

<style>
	.preview {
		margin: 0;
		position: sticky;
		top: 16px;
	}
	.screen {
		background: #0f0b16;
		border: 1px solid var(--panel-line);
		border-radius: 8px;
		overflow: hidden;
		line-height: 0;
	}
	.screen :global(canvas) {
		width: 100% !important;
		height: auto !important;
		display: block;
	}
	figcaption {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px;
		margin-top: 8px;
		font-size: 13px;
		font-weight: 700;
		color: var(--parchment-dim);
	}
	figcaption i {
		color: var(--mint);
	}
	figcaption span {
		font-weight: 400;
	}
	figcaption span::before {
		content: '·';
		margin-right: 6px;
	}
</style>
