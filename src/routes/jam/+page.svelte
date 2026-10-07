<svelte:head>
	<title>Ghost Ship | Event Plan</title>
</svelte:head>

<div class="page">

<div class="wrap">

	<div class="topbar">
		<a class="hub-back" href="/">← Ghost Ship kit</a>
		<a class="flag-link" href="https://hackclub.com" target="_blank" rel="noopener">
			<img src="/media/flag-orpheus-toffee.svg" alt="Hack Club" />
		</a>
	</div>

	<header class="masthead">
		<h1 class="title">Ghost Ship</h1>
		<p class="tagline">One club meeting. One haunted canvas. Everyone leaves with a game where you click the ghosts before the clock runs out. Beginners finish it; everyone else breaks it in new directions.</p>

		<div class="facts">
			<div class="fact"><span class="k">Duration</span><span class="v">90-120 min</span></div>
			<div class="fact"><span class="k">Stack</span><span class="v">JavaScript + p5.js</span></div>
			<div class="fact"><span class="k">Format</span><span class="v">2D browser game</span></div>
			<div class="fact"><span class="k">Output</span><span class="v">Playable build + candy</span></div>
		</div>
	</header>

	<section class="how">
		<h2 class="how-title">How it works</h2>
		<div class="how-grid">
			<div class="how-card">
				<i class="ph-bold ph-code"></i>
				<h3>Build</h3>
				<p>Fork the p5.js starter and code a ghost or Halloween-themed game in the meeting.</p>
			</div>
			<div class="how-card">
				<i class="ph-bold ph-rocket-launch"></i>
				<h3>Ship</h3>
				<p>Get the core loop working end to end: start screen, play, game over.</p>
			</div>
			<div class="how-card">
				<i class="ph-bold ph-candy"></i>
				<h3>Get candy</h3>
				<p>Show it off at the showcase and get candy on the spot, no follow-up needed.</p>
			</div>
		</div>
	</section>

	<section class="pitch">
		<div class="section-head"><span class="section-num">01</span><h2>The pitch</h2></div>
		<p>Ghost Hunt is a click-the-ghost arcade game with the smallest possible core loop: something spawns, you click it, your score goes up, a timer ends the run. That loop takes about 30 lines of p5.js, which means everyone in the room can have it working in the first half hour, and the entire rest of the meeting is theirs to spend making it their own version of spooky. The premise is simple: ship a ghost or Halloween-themed game in p5.js, get candy. It's a mini YSWS, same shape as a real Hack Club ship (build something, ship it, show it off), compressed into one meeting instead of one summer, with the reward handed over in person instead of mailed.</p>
	</section>

	<section class="challenge-section">
		<div class="section-head"><span class="section-num">02</span><h2>The challenge</h2></div>
		<blockquote class="challenge">
			Build <b>Ghost Hunt</b>: a 2D browser game where ghosts appear on screen and the player clicks them to score points before time runs out. Start from the shared p5.js template, get the core loop running, then spend the rest of the meeting adding upgrades from the menu. <b>Ship something playable, get candy</b>: a small finished game beats a big unfinished one, and only shipped games count.
		</blockquote>
	</section>

	<section>
		<div class="section-head"><span class="section-num">03</span><h2>Rules</h2></div>
		<div class="rule-grid">
			<div class="rule-card">
				<h3>Must ship</h3>
				<ol>
					<li>Fork the starter. Don't start from a blank sketch: the core loop (spawn → click → score) must already run.</li>
					<li>Playable end to end: a start screen, a play state, and a game-over screen, even if bare-bones.</li>
					<li>Pick 1-3 upgrades, not ten. A finished small game scores higher than an ambitious broken one.</li>
					<li>Credit your assets: self-made, or linked from a free-use source.</li>
				</ol>
			</div>
			<div class="rule-card fair">
				<h3>Fair play</h3>
				<ul>
					<li>Talk with your neighbor, don't paste their file.</li>
					<li>AI is fine for unblocking a single line, not for writing your upgrade.</li>
					<li>Sound and art from OpenGameArt, Kenney.nl, or Freesound: link the source in your README.</li>
				</ul>
			</div>
		</div>
	</section>

	<section>
		<div class="section-head"><span class="section-num">04</span><h2>Schedule</h2></div>
		<p class="lede">Written for a 90-minute meeting.</p>
		<div class="timeline">
			<div class="tstep"><div class="time">0:00-0:10</div><div class="what"><b>Cold open</b><p>Play the finished build on the projector: ghosts, fog, a jump-scare. This is the hook, not the tutorial.</p></div></div>
			<div class="tstep"><div class="time">0:10-0:20</div><div class="what"><b>p5.js speed-run</b><p><code>setup()</code>, <code>draw()</code>, <code>mouseClicked()</code>, <code>random()</code>, <code>dist()</code>: the five functions that run this entire game.</p></div></div>
			<div class="tstep"><div class="time">0:20-0:30</div><div class="what"><b>Fork the starter</b><p>Everyone opens the shared p5.js Web Editor sketch, hits Fork, confirms it runs, clicks one ghost.</p></div></div>
			<div class="tstep"><div class="time">0:30-1:15</div><div class="what"><b>Build time</b><p>Pick upgrades from the menu, code, playtest yourself. This is the bulk of the meeting. Protect it.</p></div></div>
			<div class="tstep"><div class="time">1:15-1:25</div><div class="what"><b>Submit</b><p>Paste your share link into the one-question form. Link stays live even if the code isn't "done."</p></div></div>
			<div class="tstep"><div class="time">1:25-1:30</div><div class="what"><b>Showcase</b><p>Three volunteers demo live. Popcorn shoutouts: Spookiest, Most Creative, Most Polished.</p></div></div>
		</div>
		<div class="callout"><b>Running 120 minutes instead?</b> Add the extra 30 to build time (0:30-1:45) and spend the freed-up minutes on a second showcase round, so more people get to demo.</div>
	</section>

	<section>
		<div class="section-head"><span class="section-num">05</span><h2>Starter kit</h2></div>
		<p class="lede">Hand everyone a working, boring game. Boring is the point: the upgrade menu is where it gets fun.</p>
		<ul class="kit-list">
			<li><span class="n">01</span><span>A canvas with a drawn ghost shape spawning at a random position on a random interval.</span></li>
			<li><span class="n">02</span><span>Click detection: <code>dist(mouseX, mouseY, ghost.x, ghost.y) &lt; ghost.r</code> removes it and adds to score.</span></li>
			<li><span class="n">03</span><span>A 30-second countdown timer driven off <code>millis()</code>.</span></li>
			<li><span class="n">04</span><span>A start screen ("click to begin") and a game-over screen showing final score with a restart button.</span></li>
			<li><span class="n">05</span><span>One ghost type, no movement, no sound. Everything past this line is an upgrade, not a requirement.</span></li>
		</ul>
		<div class="hosting"><span>📎</span><div><b>Host it on the p5.js Web Editor.</b><p>Zero install, forkable in one click, and the share link doubles as the submission link. Keep a GitHub Pages / Glitch option on hand for anyone who wants real version control.</p></div></div>
	</section>

	<section>
		<div class="section-head"><span class="section-num">06</span><h2>Upgrade menu</h2></div>
		<p class="lede">Pick from lower tiers first: they're what make a base game feel finished.</p>

		<div class="tier tier--1">
			<div class="tier-head"><h3>Tier 1: Quick wins</h3><span class="tier-time">~15 min each</span></div>
			<div class="upgrade-grid">
				<div class="upgrade"><div class="name">Moving ghosts<span class="badge">movement</span></div><p>Give each ghost a velocity and bounce it off the canvas edges instead of sitting still.</p></div>
				<div class="upgrade"><div class="name">Sound effects<span class="badge">p5.sound</span></div><p>A spawn blip, a click pop, a game-over stinger: three <code>loadSound()</code> calls.</p></div>
				<div class="upgrade"><div class="name">Start &amp; game-over screens<span class="badge">state</span></div><p>A real title screen and a restart button, not just a console log when the timer hits zero.</p></div>
				<div class="upgrade"><div class="name">Juicy scoring<span class="badge">feel</span></div><p>Flash the score text or the ghost itself on a successful hit: a one-line size/color pulse.</p></div>
			</div>
		</div>

		<div class="tier tier--2">
			<div class="tier-head"><h3>Tier 2: Core upgrades</h3><span class="tier-time">~20-30 min each</span></div>
			<div class="upgrade-grid">
				<div class="upgrade"><div class="name">Multiple enemy types<span class="badge">variety</span></div><p>Fast ghost worth more, slow pumpkin worth less, bat that costs you a life if it escapes.</p></div>
				<div class="upgrade"><div class="name">Health / lives<span class="badge">stakes</span></div><p>Lose a life when a bat crosses the screen unclicked; game ends at zero, not just at 0:00.</p></div>
				<div class="upgrade"><div class="name">Power-ups<span class="badge">variety</span></div><p>A rare pumpkin that freezes spawns for 3s, doubles points, or clears the whole screen on click.</p></div>
				<div class="upgrade"><div class="name">Difficulty ramp<span class="badge">pacing</span></div><p>Shrink the spawn interval as <code>millis()</code> climbs, so the back half of the run is harder than the front.</p></div>
			</div>
		</div>

		<div class="tier tier--3">
			<div class="tier-head"><h3>Tier 3: Boss level</h3><span class="tier-time">~30-45 min, for the experienced</span></div>
			<div class="upgrade-grid">
				<div class="upgrade"><div class="name">Boss enemy<span class="badge">advanced</span></div><p>A big ghost with an on-screen health bar that takes multiple clicks and has its own attack pattern.</p></div>
				<div class="upgrade"><div class="name">Fog, lightning &amp; jumpscares<span class="badge">atmosphere</span></div><p>A semi-transparent particle layer for fog, a screen-flash for lightning, a full-screen sprite for a miss-streak jumpscare.</p></div>
				<div class="upgrade"><div class="name">High score storage<span class="badge">localStorage</span></div><p>Persist a top-5 list across runs so the leaderboard survives a refresh.</p></div>
				<div class="upgrade"><div class="name">Combo multiplier<span class="badge">advanced</span></div><p>Consecutive hits within a short window stack a score multiplier; a miss resets it to 1x.</p></div>
			</div>
		</div>
	</section>

	<section>
		<div class="section-head"><span class="section-num">07</span><h2>Presenting it as a mini YSWS</h2></div>
		<div class="ysws-intro">
			<p><b>YSWS</b> (You Ship, We Ship) is Hack Club's ship-something-get-something model. Here the trade is concrete: ship a ghost or Halloween-themed p5.js game, get candy. This meeting compresses the usual weeks-long YSWS loop into 90 minutes: the "ship" bar is a working link and a repo, not a finished product. The point is that everyone actually finishes and submits something real, not that it's polished.</p>
		</div>
		<div class="ysws-cols">
			<div class="rule-card">
				<h3>What participants submit</h3>
				<ol>
					<li>Playable link: the p5 Web Editor share link, or a GitHub Pages URL.</li>
					<li>Source: the editor link already has it, or attach a repo.</li>
					<li>One GIF or ~20-second clip of the game being played.</li>
					<li>Two sentences: which upgrades you added, and why.</li>
					<li>Your name / Slack handle, for the showcase and so we know who to hand candy to.</li>
				</ol>
			</div>
			<div class="rule-card fair">
				<h3>Before the meeting</h3>
				<ul>
					<li>Run the starter start-to-finish yourself, including a full game-over.</li>
					<li>Publish it as a forkable p5 Web Editor sketch; link it in the invite.</li>
					<li>Pre-load a small free-use sound pack (spawn, click, jumpscare sting) so no one stalls hunting for audio.</li>
					<li>Set up a one-field submission form: just the game link, nothing else.</li>
					<li>Bring the candy. That's the reward, full stop: hand it out on the spot to anyone who ships a working game, the same trade as trick-or-treating.</li>
				</ul>
			</div>
		</div>
	</section>

	<section>
		<div class="section-head"><span class="section-num">08</span><h2>FAQ</h2></div>
		<div class="faq">
			<details class="faq-item">
				<summary>Who can join?</summary>
				<p>Anyone at the club meeting. No prior JavaScript or p5.js experience needed: the tutorial builds the base game from a blank sketch.</p>
			</details>
			<details class="faq-item">
				<summary>Can I use AI?</summary>
				<p>For unblocking a single line, sure. Not for writing your upgrade. The point of the meeting is that you wrote the thing you're showing off.</p>
			</details>
			<details class="faq-item">
				<summary>What if I don't finish?</summary>
				<p>Ship what you've got. A working base game with zero upgrades still counts: the bar is a playable link, not a polished product.</p>
			</details>
			<details class="faq-item">
				<summary>Can I work with a partner?</summary>
				<p>Talk through problems together, but write your own file. Two people submitting the same code both need to have actually built it.</p>
			</details>
			<details class="faq-item">
				<summary>Is there a deadline?</summary>
				<p>The end of the meeting. Submissions and candy happen live at the showcase, not after the fact.</p>
			</details>
			<details class="faq-item">
				<summary>Do I need to install anything?</summary>
				<p>No. Everything runs in the p5.js Web Editor in a browser tab.</p>
			</details>
		</div>
	</section>

	<footer class="next">
		<span class="tag">Kit</span>
		<p>See the base game built step-by-step in <a href="/tutorial/">Building Ghost Hunt</a>, or play the finished <a href="/demo/">reference build</a>.</p>
	</footer>

</div>
</div>

<style>
	:global(:root) {
		--bg: #f1efe9;
		--surface: #ffffff;
		--surface-alt: #eae5da;
		--ink: #211d26;
		--ink-soft: #635c6d;
		--ink-faint: #8b8494;
		--accent: #bd5a1f;
		--accent-ink: #fffaf3;
		--accent2: #4c7858;
		--accent2-soft: #e2ebe2;
		--line: #dcd6c9;
		--danger: #9c3b3b;
		--font-display: 'Griffy', cursive;
		--font-body: 'Phantom Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
		--font-mono: 'SFMono-Regular', Consolas, monospace;
	}
	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme='light'])) {
			--bg: #151219;
			--surface: #1e1a23;
			--surface-alt: #26212d;
			--ink: #ece6e8;
			--ink-soft: #a89eae;
			--ink-faint: #756c80;
			--accent: #e08a3e;
			--accent-ink: #1c1108;
			--accent2: #82ae8d;
			--accent2-soft: #213028;
			--line: #352f3e;
			--danger: #e08a8a;
		}
	}
	:global(:root[data-theme='dark']) {
		--bg: #151219;
		--surface: #1e1a23;
		--surface-alt: #26212d;
		--ink: #ece6e8;
		--ink-soft: #a89eae;
		--ink-faint: #756c80;
		--accent: #e08a3e;
		--accent-ink: #1c1108;
		--accent2: #82ae8d;
		--accent2-soft: #213028;
		--line: #352f3e;
		--danger: #e08a8a;
	}

	:global(*) {
		box-sizing: border-box;
	}
	.page {
		min-height: 100vh;
		min-height: 100dvh;
		background: var(--bg);
		color: var(--ink);
		font-family: var(--font-body);
		line-height: 1.55;
		padding: clamp(20px, 5vw, 64px) 20px 72px;
	}
	.wrap {
		max-width: 840px;
		margin: 0 auto;
	}

	h1, h2, h3 {
		font-family: var(--font-display);
		font-weight: 700;
		text-wrap: balance;
		color: var(--ink);
	}
	p {
		max-width: 66ch;
	}
	a {
		color: var(--accent);
	}

	header.masthead {
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding-bottom: 28px;
		margin-bottom: 36px;
		border-bottom: 1px solid var(--line);
	}
	h1.title {
		font-size: clamp(2.4rem, 6vw, 3.6rem);
		line-height: 1.02;
		margin: 0;
	}
	.tagline {
		font-size: clamp(1.02rem, 2.4vw, 1.2rem);
		color: var(--ink-soft);
		max-width: 56ch;
		margin: 0;
	}

	.facts {
		display: flex;
		flex-wrap: wrap;
		gap: 0;
		margin-top: 6px;
		border: 1px solid var(--line);
		border-radius: 10px;
		overflow: hidden;
	}
	.fact {
		flex: 1 1 160px;
		padding: 12px 16px;
		border-right: 1px solid var(--line);
		background: var(--surface);
	}
	.fact:last-child {
		border-right: none;
	}
	.fact .k {
		display: block;
		font-family: var(--font-body);
		font-size: 10.5px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-faint);
		margin-bottom: 4px;
	}
	.fact .v {
		font-weight: 600;
		font-size: 14.5px;
	}

	section {
		margin-bottom: 52px;
	}
	.section-head {
		display: flex;
		align-items: baseline;
		gap: 12px;
		margin-bottom: 16px;
	}
	.section-num {
		font-family: var(--font-body);
		font-size: 13px;
		color: var(--ink-faint);
	}
	h2 {
		font-size: clamp(1.5rem, 3.4vw, 1.9rem);
		margin: 0;
	}
	.lede {
		color: var(--ink-soft);
		margin-top: -6px;
		margin-bottom: 18px;
	}

	.pitch p {
		max-width: 70ch;
	}

	blockquote.challenge {
		font-family: var(--font-display);
		font-size: clamp(1.1rem, 2.6vw, 1.35rem);
		line-height: 1.5;
		color: var(--ink);
		background: var(--surface);
		border: 1px solid var(--line);
		border-left: 4px solid var(--accent);
		border-radius: 4px;
		padding: 22px 26px;
		margin: 0;
	}
	blockquote.challenge b {
		color: var(--accent);
		font-weight: 700;
	}

	.rule-grid {
		display: grid;
		grid-template-columns: 1.3fr 1fr;
		gap: 22px;
	}
	@media (max-width: 640px) {
		.rule-grid {
			grid-template-columns: 1fr;
		}
	}
	.rule-card {
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 10px;
		padding: 20px 22px;
	}
	.rule-card h3 {
		font-size: 1.02rem;
		margin: 0 0 12px;
		font-family: var(--font-body);
		font-weight: 700;
	}
	.rule-card ol, .rule-card ul {
		margin: 0;
		padding-left: 20px;
		display: flex;
		flex-direction: column;
		gap: 9px;
		font-size: 14.5px;
	}
	.rule-card li::marker {
		color: var(--accent2);
		font-family: var(--font-body);
		font-size: 13px;
	}
	.rule-card.fair li::marker {
		color: var(--ink-faint);
	}

	.timeline {
		display: flex;
		flex-direction: column;
	}
	.tstep {
		display: grid;
		grid-template-columns: 104px 1fr;
		gap: 18px;
		padding: 14px 0;
		border-top: 1px solid var(--line);
	}
	.tstep:last-child {
		border-bottom: 1px solid var(--line);
	}
	.tstep .time {
		font-family: var(--font-body);
		font-size: 12.5px;
		color: var(--accent2);
		font-variant-numeric: tabular-nums;
		padding-top: 2px;
	}
	.tstep .what b {
		font-weight: 700;
	}
	.tstep .what p {
		margin: 2px 0 0;
		color: var(--ink-soft);
		font-size: 14.5px;
		max-width: 60ch;
	}

	.callout {
		margin-top: 16px;
		background: var(--accent2-soft);
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 14px 18px;
		font-size: 14px;
		color: var(--ink);
	}
	.callout b {
		color: var(--accent2);
	}

	.kit-list {
		list-style: none;
		margin: 18px 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
	}
	.kit-list li {
		display: grid;
		grid-template-columns: 28px 1fr;
		gap: 12px;
		padding: 12px 0;
		border-top: 1px solid var(--line);
		font-size: 14.5px;
	}
	.kit-list li:last-child {
		border-bottom: 1px solid var(--line);
	}
	.kit-list .n {
		font-family: var(--font-body);
		color: var(--ink-faint);
		font-size: 13px;
	}
	.kit-list :global(code) {
		background: var(--surface-alt);
		border-radius: 4px;
		padding: 1px 5px;
		font-family: var(--font-mono);
		font-size: 13px;
	}
	.hosting {
		margin-top: 16px;
		display: flex;
		gap: 12px;
		align-items: flex-start;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 16px 18px;
	}
	.hosting b {
		color: var(--accent);
	}
	.hosting p {
		margin: 4px 0 0;
		font-size: 14px;
		color: var(--ink-soft);
	}

	.tier {
		margin-bottom: 26px;
	}
	.tier-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 12px;
		flex-wrap: wrap;
	}
	.tier-head h3 {
		font-family: var(--font-body);
		font-size: 1.02rem;
		font-weight: 700;
		margin: 0;
	}
	.tier-time {
		font-family: var(--font-body);
		font-size: 12px;
		color: var(--ink-faint);
	}
	.upgrade-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 12px;
	}
	@media (max-width: 640px) {
		.upgrade-grid {
			grid-template-columns: 1fr;
		}
	}
	.upgrade {
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 13px 15px;
	}
	.upgrade .name {
		font-weight: 600;
		font-size: 14.5px;
		display: flex;
		justify-content: space-between;
		gap: 8px;
	}
	.upgrade .name span.badge {
		font-family: var(--font-body);
		font-size: 11px;
		color: var(--accent2);
		white-space: nowrap;
		font-weight: 500;
	}
	.upgrade p {
		margin: 5px 0 0;
		font-size: 13.3px;
		color: var(--ink-soft);
	}
	.tier--1 .upgrade {
		border-left: 3px solid var(--accent2);
	}
	.tier--2 .upgrade {
		border-left: 3px solid var(--accent);
	}
	.tier--3 .upgrade {
		border-left: 3px solid var(--danger);
	}

	.ysws-intro {
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 10px;
		padding: 20px 22px;
		margin-bottom: 22px;
	}
	.ysws-intro p {
		margin: 0;
		max-width: 68ch;
		font-size: 14.5px;
		color: var(--ink);
	}
	.ysws-cols {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 22px;
	}
	@media (max-width: 640px) {
		.ysws-cols {
			grid-template-columns: 1fr;
		}
	}

	footer.next {
		margin-top: 8px;
		padding-top: 24px;
		border-top: 1px solid var(--line);
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}
	footer.next .tag {
		font-family: var(--font-body);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--accent);
	}
	footer.next p {
		margin: 0;
		font-size: 14.5px;
		color: var(--ink-soft);
	}

	.hub-back {
		font-family: var(--font-body);
		font-size: 12px;
		color: var(--ink-faint);
		text-decoration: none;
	}
	.hub-back:hover {
		color: var(--accent);
	}

	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}
	.flag-link {
		display: flex;
		align-items: center;
		opacity: 0.7;
	}
	.flag-link:hover {
		opacity: 1;
	}
	.flag-link img {
		height: 34px;
		width: auto;
	}

	section.how {
		margin-bottom: 44px;
	}
	.how-title {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-faint);
		margin: 0 0 14px;
	}
	.how-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 14px;
	}
	@media (max-width: 640px) {
		.how-grid {
			grid-template-columns: 1fr;
		}
	}
	.how-card {
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 10px;
		padding: 20px 20px 22px;
	}
	.how-card i {
		font-size: 22px;
		color: var(--accent);
	}
	.how-card h3 {
		font-family: var(--font-body);
		font-size: 1.02rem;
		font-weight: 700;
		margin: 10px 0 6px;
	}
	.how-card p {
		margin: 0;
		font-size: 13.5px;
		color: var(--ink-soft);
	}

	.faq {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	details.faq-item {
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 14px 18px;
	}
	details.faq-item summary {
		cursor: pointer;
		font-weight: 600;
		font-size: 14.5px;
		list-style: none;
	}
	details.faq-item summary::-webkit-details-marker {
		display: none;
	}
	details.faq-item summary::before {
		content: '+';
		display: inline-block;
		width: 1.1em;
		color: var(--accent);
		font-weight: 700;
	}
	details.faq-item[open] summary::before {
		content: '−';
	}
	details.faq-item p {
		margin: 10px 0 0 1.1em;
		font-size: 13.8px;
		color: var(--ink-soft);
	}
</style>
