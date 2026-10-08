<script>
	import { onMount } from 'svelte';

	let { sketch, hint = '' } = $props();
	let holder;
	let running = $state(false);
	let P5;
	let instance;
	let observer;

	function play() {
		if (!P5) return;
		stop();
		instance = new P5(sketch, holder);
		running = true;
		setTimeout(() => {
			if (!instance || !instance.isLooping()) return;
			observer = new IntersectionObserver(([entry]) => {
				if (!instance) return;
				if (entry.isIntersecting) instance.loop();
				else instance.noLoop();
			});
			observer.observe(holder);
		}, 0);
	}

	function stop() {
		observer?.disconnect();
		observer = null;
		instance?.remove();
		instance = null;
		running = false;
	}

	onMount(() => {
		let alive = true;
		import('p5').then(({ default: p5 }) => {
			if (!alive) return;
			P5 = p5;
		});
		return () => {
			alive = false;
			stop();
		};
	});
</script>

<figure class="preview">
	<div class="bar">
		<button type="button" class="play" class:on={running} onclick={play} aria-label="Run" title="Run">
			<i class="ph-fill ph-play"></i>
		</button>
		<button type="button" class="stop" class:on={!running} onclick={stop} aria-label="Stop" title="Stop">
			<i class="ph-fill ph-stop"></i>
		</button>
		<span class="label">Preview</span>
	</div>
	<div class="screen" bind:this={holder}></div>
	{#if hint}<figcaption>{hint}</figcaption>{/if}
</figure>

<style>
	.preview {
		margin: 0;
		position: sticky;
		top: 16px;
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}
	.bar button {
		width: 30px;
		height: 30px;
		display: grid;
		place-items: center;
		border-radius: 50%;
		border: none;
		cursor: pointer;
		font-size: 13px;
		background: #3a3046;
		color: var(--parchment);
	}
	.bar .play.on {
		background: #ed225d;
		color: #fff;
	}
	.bar .stop.on {
		background: #ed225d;
		color: #fff;
	}
	.bar button:focus-visible {
		outline: 2px solid var(--pumpkin);
		outline-offset: 2px;
	}
	.label {
		font-size: 12px;
		color: var(--parchment-dim);
		margin-left: 4px;
	}
	.screen {
		background: #000;
		border: 1px solid var(--panel-line);
		border-radius: 8px;
		overflow: hidden;
		line-height: 0;
	}
	.screen:empty {
		aspect-ratio: 4 / 3;
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
		color: var(--parchment-dim);
	}
</style>
