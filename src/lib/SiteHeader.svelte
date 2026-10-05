<script>
	import { SUBMIT_URL } from '$lib/links.js';

	let { current = '' } = $props();

	const tabs = [
		{ id: 'guide', label: 'Guide', href: '/tutorial/', icon: 'ph-book-open' },
		{ id: 'requirements', label: 'Requirements', href: '/requirements/', icon: 'ph-list-checks' },
		{ id: 'workshop', label: 'Run a Workshop', href: '/jam/', icon: 'ph-users-three' },
		{ id: 'submit', label: 'Individual Submissions', href: SUBMIT_URL, icon: 'ph-rocket-launch' },
		{ id: 'faq', label: 'FAQ', href: '/#faq', icon: 'ph-question' }
	];
</script>

<header class="site">
	<svg class="web" viewBox="0 0 300 300" aria-hidden="true">
		<path d="M300 0L300.0 300.0 M300 0L222.4 289.8 M300 0L150.0 259.8 M300 0L87.9 212.1 M300 0L40.2 150.0 M300 0L10.2 77.6 M300 0L0.0 0.0 M300.0 40.0Q295.5 34.1 289.6 38.6 M289.6 38.6Q286.8 31.8 280.0 34.6 M280.0 34.6Q279.1 27.3 271.7 28.3 M271.7 28.3Q272.7 20.9 265.4 20.0 M265.4 20.0Q268.2 13.2 261.4 10.4 M261.4 10.4Q265.9 4.5 260.0 0.0 M300.0 78.0Q291.2 66.5 279.8 75.3 M279.8 75.3Q274.3 62.0 261.0 67.5 M261.0 67.5Q259.2 53.2 244.8 55.2 M244.8 55.2Q246.8 40.8 232.5 39.0 M232.5 39.0Q238.0 25.7 224.7 20.2 M224.7 20.2Q233.5 8.8 222.0 0.0 M300.0 118.0Q286.8 100.6 269.5 114.0 M269.5 114.0Q261.2 93.8 241.0 102.2 M241.0 102.2Q238.2 80.5 216.6 83.4 M216.6 83.4Q219.5 61.8 197.8 59.0 M197.8 59.0Q206.2 38.8 186.0 30.5 M186.0 30.5Q199.4 13.2 182.0 0.0 M300.0 160.0Q282.0 136.4 258.6 154.5 M258.6 154.5Q247.3 127.1 220.0 138.6 M220.0 138.6Q216.2 109.2 186.9 113.1 M186.9 113.1Q190.8 83.8 161.4 80.0 M161.4 80.0Q172.9 52.7 145.5 41.4 M145.5 41.4Q163.6 18.0 140.0 0.0 M300.0 205.0Q277.0 174.8 246.9 198.0 M246.9 198.0Q232.5 162.9 197.5 177.5 M197.5 177.5Q192.7 139.9 155.0 145.0 M155.0 145.0Q160.1 107.3 122.5 102.5 M122.5 102.5Q137.1 67.5 102.0 53.1 M102.0 53.1Q125.2 23.0 95.0 0.0 M300.0 250.0Q271.9 213.2 235.3 241.5 M235.3 241.5Q217.7 198.6 175.0 216.5 M175.0 216.5Q169.1 170.6 123.2 176.8 M123.2 176.8Q129.4 130.9 83.5 125.0 M83.5 125.0Q101.4 82.3 58.5 64.7 M58.5 64.7Q86.8 28.1 50.0 0.0" />
		<line class="silk" x1="220.0" y1="138.6" x2="220.0" y2="208.6" />
		<g class="spider" transform="translate(220.0 208.6)">
			<path d="M-9 -4L-15 -9M-9 0L-17 -1M-9 3L-15 8M-8 5L-12 12M9 -4L15 -9M9 0L17 -1M9 3L15 8M8 5L12 12" />
			<ellipse rx="7" ry="8" />
			<circle cy="-9" r="4.5" />
		</g>
	</svg>
	<a class="flag-link" href="https://hackclub.com" target="_blank" rel="noopener">
		<img src="/media/flag-orpheus-toffee.svg" alt="Hack Club" />
	</a>
	<nav class="site-nav">
		{#each tabs as tab}
			<a class:current={current === tab.id} href={tab.href}>
				<i class="ph-bold {tab.icon}"></i>{tab.label}
			</a>
		{/each}
	</nav>
</header>

<style>
	header.site {
		--flag-w: clamp(150px, 20vw, 256px);
		position: relative;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		min-height: calc(var(--flag-w) * 0.5625);
		padding: 18px 24px 18px calc(var(--flag-w) + 24px);
	}
	.flag-link {
		position: absolute;
		top: 0;
		left: 0;
	}
	.flag-link img {
		display: block;
		width: var(--flag-w);
		height: auto;
	}
	.web {
		position: absolute;
		top: 0;
		right: 0;
		width: 22%;
		height: auto;
		pointer-events: none;
		z-index: 0;
	}
	.web > path,
	.web .silk {
		fill: none;
		stroke: var(--parchment);
		stroke-opacity: 0.16;
		stroke-width: 1.2;
	}
	.web .spider {
		fill: #0b0810;
		stroke: var(--parchment);
		stroke-opacity: 0.35;
		stroke-width: 1.2;
	}
	nav.site-nav {
		position: relative;
		z-index: 1;
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		justify-content: flex-end;
	}
	nav.site-nav a {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-body);
		font-size: 16px;
		font-weight: 700;
		text-decoration: none;
		color: var(--parchment);
		background: var(--panel);
		padding: 12px 20px;
		border-radius: 999px;
		border: 2px solid var(--panel-line);
		transition:
			border-color 0.15s,
			color 0.15s,
			transform 0.15s;
	}
	nav.site-nav a i {
		font-size: 18px;
		color: var(--pumpkin);
	}
	nav.site-nav a:hover {
		border-color: var(--pumpkin);
		color: var(--pumpkin);
		transform: translateY(-2px);
	}
	nav.site-nav a.current {
		background: var(--pumpkin);
		border-color: var(--pumpkin);
		color: #241505;
	}
	nav.site-nav a.current i {
		color: #241505;
	}

	@media (max-width: 720px) {
		header.site {
			--flag-w: 130px;
			flex-direction: column;
			align-items: stretch;
			padding: calc(var(--flag-w) * 0.5625 + 12px) 16px 12px;
		}
		nav.site-nav {
			justify-content: center;
		}
		nav.site-nav a {
			font-size: 14px;
			padding: 10px 14px;
		}
	}
</style>
