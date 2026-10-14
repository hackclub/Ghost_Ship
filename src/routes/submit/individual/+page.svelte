<script>
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';

	let { data, form } = $props();

	const v = $derived(form?.values ?? {});
	let tool = $state('hackatime');
	$effect(() => {
		if (form?.values?.tool) tool = form.values.tool;
	});

	const blockedText = {
		denied: {
			title: 'Sign-in cancelled',
			body: 'You need to sign in with Hackatime to submit. Press the button to try again.'
		},
		banned: {
			title: 'This account can\'t submit',
			body: 'Your Hackatime account is flagged, so it can\'t submit to Ghost Ship. If you think this is a mistake, ask in #hackatime-help on the Hack Club Slack.'
		},
		needs_submission: {
			title: 'Verify your identity first',
			body: 'You haven\'t verified with Hack Club Auth yet. Verify at auth.hackclub.com, then come back and submit.'
		},
		pending: {
			title: 'Verification is still in review',
			body: 'Hack Club Auth is still reviewing your identity. Come back once you\'re verified.'
		},
		verified_but_over_18: {
			title: 'Ghost Ship is for teens',
			body: 'Your Hack Club Auth account is verified, but Ghost Ship is only for people 18 and under.'
		},
		rejected: {
			title: 'Verification was rejected',
			body: 'Hack Club Auth rejected your verification. Check auth.hackclub.com for details.'
		},
		already_submitted: {
			title: 'You already submitted!',
			body: 'Each person can submit one game to Ghost Ship, and we already have yours. Need to change something? Ask in the Hack Club Slack.'
		},
		not_found: {
			title: 'No Hack Club Auth account found',
			body: 'We couldn\'t match your Hackatime email or Slack ID to a Hack Club Auth account. Make one at auth.hackclub.com with the same email, verify it, then come back.'
		}
	};
	let shotInput = $state();
	let shotPreview = $state('');
	let shotName = $state('');
	let dragging = $state(false);

	function showShot(file) {
		if (shotPreview) URL.revokeObjectURL(shotPreview);
		shotPreview = file ? URL.createObjectURL(file) : '';
		shotName = file?.name ?? '';
	}

	function dropShot(e) {
		e.preventDefault();
		dragging = false;
		const file = e.dataTransfer.files[0];
		if (!file?.type.startsWith('image/')) return;
		const files = new DataTransfer();
		files.items.add(file);
		shotInput.files = files.files;
		showShot(file);
	}

	const blocked = $derived(data.blocked ? (blockedText[data.blocked] ?? blockedText.not_found) : null);
</script>

<svelte:head>
	<title>Ghost Ship | Individual Submission</title>
</svelte:head>

<div class="page">

<SiteHeader current="submit" />

<main>
	{#if blocked}
		<header class="intro">
			<h1>{blocked.title}</h1>
			<p>{blocked.body}</p>
		</header>
		<div class="cta">
			{#if data.blocked === 'denied'}
				<a class="btn primary" href="/auth/hackatime/login"><i class="ph-bold ph-sign-in"></i>Sign in with Hackatime</a>
			{:else if data.blocked === 'already_submitted'}
				<a class="btn primary" href="/"><i class="ph-bold ph-house"></i>Back home</a>
			{:else if data.blocked !== 'banned' && data.blocked !== 'verified_but_over_18'}
				<a class="btn primary" href="https://auth.hackclub.com" target="_blank" rel="noopener"><i class="ph-bold ph-identification-card"></i>Open Hack Club Auth</a>
			{/if}
			<form method="POST" action="/auth/logout"><button class="btn ghost"><i class="ph-bold ph-sign-out"></i>Sign out</button></form>
		</div>
	{:else if form?.success}
		<header class="intro">
			<h1>Submitted!</h1>
			<p>Your game is in. We'll review it and reach out on Slack or email. Happy haunting!</p>
		</header>
		<div class="cta">
			<a class="btn primary" href="/"><i class="ph-bold ph-house"></i>Back home</a>
		</div>
	{:else}
		<header class="intro">
			<h1>Submit your game</h1>
			<p>This is the individual form, so you must have tracked your time with Hackatime or Lapse. I'm excited to see what you made! At a workshop? Submit at <a href="https://clubs.hackclub.com/workshops" target="_blank" rel="noopener">clubs.hackclub.com/workshops</a> instead.</p>
			<p class="who">Fields marked <span class="star">*</span> are required.</p>
			<p class="who">Signed in as <b>{data.email || data.slackId}</b>, which is where your HCB grant for candy will go to! Make sure to make/have an <a href="https://hcb.hackclub.com" target="_blank" rel="noopener">HCB account</a> as well.</p>
		</header>

		{#if form?.error}
			<p class="error" role="alert"><i class="ph-bold ph-warning"></i>{form.error}</p>
		{/if}

		<form method="POST" class="card" enctype="multipart/form-data">
			<h2>Your game</h2>
			<label>
				<span>Code URL</span>
				<small>Your GitHub repository link</small>
				<input name="repoUrl" type="url" required placeholder="https://github.com/you/ghost-hunt" value={v.repoUrl ?? ''} />
			</label>
			<label>
				<span>Playable URL</span>
				<small>Your GitHub Pages link</small>
				<input name="pagesUrl" type="url" required placeholder="https://you.github.io/ghost-hunt/" value={v.pagesUrl ?? ''} />
			</label>
			<label>
				<span>What is your project about?</span>
				<small>Make sure to describe how it fits the requirements!</small>
				<textarea name="description" rows="4" required>{v.description ?? ''}</textarea>
			</label>
			<label>
				<span>Your 2-3 unique features</span>
				<textarea name="features" rows="4" required>{v.features ?? ''}</textarea>
			</label>
			<div class="field">
				<span>Screenshot</span>
				<small>A screenshot of your project in action (image, under 5 MB)</small>
				<label
					class="drop"
					class:over={dragging}
					ondragover={(e) => { e.preventDefault(); dragging = true; }}
					ondragleave={() => (dragging = false)}
					ondrop={dropShot}
				>
					<input bind:this={shotInput} name="screenshot" type="file" accept="image/*" required onchange={() => showShot(shotInput.files[0])} />
					{#if shotPreview}
						<img src={shotPreview} alt="Your screenshot" />
						<span class="file">{shotName}<em>Click or drop to replace</em></span>
					{:else}
						<i class="ph-bold ph-image"></i>
						<span class="file">Drag your screenshot here<em>or click to choose a file</em></span>
					{/if}
				</label>
			</div>

			<fieldset>
				<legend class="req">How did you track your time?</legend>
				<div class="tabs">
					<label class="tab" class:active={tool === 'hackatime'}>
						<input type="radio" name="tool" value="hackatime" bind:group={tool} />
						<i class="ph-bold ph-code"></i>VS Code + Hackatime
					</label>
					<label class="tab" class:active={tool === 'lapse'}>
						<input type="radio" name="tool" value="lapse" bind:group={tool} />
						<i class="ph-bold ph-video-camera"></i>Lapse
					</label>
				</div>

				{#if tool === 'hackatime'}
					{#if data.projects.length}
						<p class="hint">Pick the Hackatime project(s) for this game.</p>
						<div class="projects">
							{#each data.projects as p}
								<label class="project">
									<input type="checkbox" name="projects" value={p.name} checked={v.chosen?.includes(p.name)} />
									<span class="name">{p.name}</span>
									<span class="hours">{p.hours}h</span>
								</label>
							{/each}
						</div>
					{:else}
						<p class="hint">No Hackatime projects found yet. Code in VS Code with Hackatime set up, then come back.</p>
					{/if}
				{:else}
					<label>
						<span>Every timelapse link, comma separated</span>
						<textarea name="lapseLinks" rows="4" required placeholder="https://lapse.hackclub.com/..., https://lapse.hackclub.com/...">{v.lapseLinks ?? ''}</textarea>
					</label>
				{/if}
			</fieldset>

			<fieldset>
				<legend>Bonus challenges (optional)</legend>
				<label class="check"><input type="checkbox" name="bonus" value="Custom art & sound" checked={v.bonus?.includes('Custom art & sound')} />Custom art &amp; sound</label>
				<label class="check"><input type="checkbox" name="bonus" value="Two more levels" checked={v.bonus?.includes('Two more levels')} />Two more levels</label>
			</fieldset>

			<h2>About you</h2>
			<p class="hint">We need your address to mail your candy and your birthday to check eligibility.</p>
			<div class="row">
				<label>
					<span>First name</span>
					<input name="firstName" required autocomplete="given-name" value={v.firstName ?? ''} />
				</label>
				<label>
					<span>Last name</span>
					<input name="lastName" required autocomplete="family-name" value={v.lastName ?? ''} />
				</label>
			</div>
			<div class="row">
				<label>
					<span>Birthday</span>
					<input name="birthday" type="date" required autocomplete="bday" value={v.birthday ?? ''} />
				</label>
				<label>
					<span>GitHub username</span>
					<input name="githubUsername" required value={v.githubUsername ?? data.githubUsername} />
				</label>
			</div>
			<label>
				<span>Address line 1</span>
				<input name="address1" required autocomplete="address-line1" value={v.address1 ?? ''} />
			</label>
			<label>
				<span>Address line 2 (optional)</span>
				<input name="address2" autocomplete="address-line2" value={v.address2 ?? ''} />
			</label>
			<div class="row">
				<label>
					<span>City</span>
					<input name="city" required autocomplete="address-level2" value={v.city ?? ''} />
				</label>
				<label>
					<span>State / Province</span>
					<input name="state" required autocomplete="address-level1" value={v.state ?? ''} />
				</label>
			</div>
			<div class="row">
				<label>
					<span>ZIP / Postal code</span>
					<input name="zip" required autocomplete="postal-code" value={v.zip ?? ''} />
				</label>
				<label>
					<span>Country</span>
					<input name="country" required autocomplete="country-name" value={v.country ?? ''} />
				</label>
			</div>

			<h2>Finally, some feedback</h2>
			<label>
				<span>How did you hear about Ghost Ship?</span>
				<textarea name="heardFrom" rows="2" required>{v.heardFrom ?? ''}</textarea>
			</label>
			<label>
				<span>What are we doing well?</span>
				<textarea name="doingWell" rows="2" required>{v.doingWell ?? ''}</textarea>
			</label>
			<label>
				<span>How can we improve?</span>
				<textarea name="improve" rows="2" required>{v.improve ?? ''}</textarea>
			</label>

			<div class="cta">
				<button class="btn primary"><i class="ph-bold ph-rocket-launch"></i>Submit</button>
			</div>
		</form>
		<form method="POST" action="/auth/logout" class="signout"><button class="link">Not you? Sign out</button></form>
	{/if}
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
		max-width: 720px;
		margin: 0 auto;
		padding: clamp(24px, 5vh, 56px) 16px 56px;
	}
	.intro {
		margin-bottom: 24px;
	}
	h1 {
		font-family: var(--font-display);
		font-size: clamp(2.4rem, 6vw, 3.4rem);
		line-height: 1.05;
		margin: 0 0 12px;
	}
	.intro p {
		color: var(--parchment-dim);
		font-size: 1.1rem;
		line-height: 1.6;
		margin: 0;
	}
	.intro b {
		color: var(--parchment);
	}
	a {
		color: var(--pumpkin);
	}
	.card {
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding: 24px;
		background: var(--panel);
		border: 1px solid var(--panel-line);
		border-radius: 12px;
	}
	.card h2 {
		font-family: var(--font-display);
		font-size: 1.6rem;
		margin: 8px 0 0;
	}
	.card h2:first-child {
		margin-top: 0;
	}
	.row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 18px;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	label > span,
	.field > span {
		font-weight: 700;
	}
	label:has(:required) > span::after,
	.field:has(:required) > span::after,
	legend.req::after {
		content: ' *';
		color: var(--pumpkin);
	}
	.field > small,
	label > small {
		margin-top: -4px;
		color: var(--parchment-dim);
		font-size: 0.9rem;
	}
	.drop {
		position: relative;
		flex-direction: row;
		align-items: center;
		gap: 14px;
		min-height: 120px;
		padding: 16px;
		background: var(--night);
		border: 2px dashed var(--panel-line);
		border-radius: 12px;
		cursor: pointer;
		transition: border-color 0.15s;
	}
	.drop:hover,
	.drop.over {
		border-color: var(--pumpkin);
	}
	.drop input {
		position: absolute;
		inset: 0;
		opacity: 0;
		cursor: pointer;
	}
	.drop > i {
		font-size: 36px;
		color: var(--pumpkin);
	}
	.drop img {
		width: 120px;
		max-height: 90px;
		object-fit: cover;
		border-radius: 6px;
	}
	.drop .file {
		display: flex;
		flex-direction: column;
		gap: 2px;
		font-weight: 700;
		overflow-wrap: anywhere;
	}
	.drop em {
		font-style: normal;
		font-weight: 400;
		color: var(--parchment-dim);
		font-size: 0.9rem;
	}
	.star {
		color: var(--pumpkin);
		font-weight: 700;
	}
	.intro p + p {
		margin-top: 10px;
	}
	input:not([type='radio']):not([type='checkbox']),
	textarea {
		width: 100%;
		padding: 10px 12px;
		font: inherit;
		color: var(--parchment);
		background: var(--night);
		border: 2px solid var(--panel-line);
		border-radius: 8px;
	}
	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--pumpkin);
	}
	fieldset {
		margin: 0;
		padding: 0;
		border: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	legend {
		font-weight: 700;
		margin-bottom: 10px;
	}
	.tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.tab {
		flex-direction: row;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		border: 2px solid var(--panel-line);
		border-radius: 999px;
		cursor: pointer;
		font-weight: 700;
	}
	.tab input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}
	.tab.active {
		border-color: var(--pumpkin);
		color: var(--pumpkin);
	}
	.hint {
		margin: 0;
		color: var(--parchment-dim);
	}
	.projects {
		display: flex;
		flex-direction: column;
		gap: 6px;
		max-height: 320px;
		overflow-y: auto;
	}
	.project,
	.check {
		flex-direction: row;
		align-items: center;
		gap: 10px;
		cursor: pointer;
	}
	.project {
		padding: 10px 12px;
		background: var(--night);
		border: 1px solid var(--panel-line);
		border-radius: 8px;
	}
	.project:has(input:checked) {
		border-color: var(--mint);
	}
	.project .name {
		flex: 1;
		overflow-wrap: anywhere;
		font-weight: 400;
	}
	.project .hours {
		color: var(--mint);
		font-family: 'IBM Plex Mono', monospace;
	}
	input[type='checkbox'] {
		accent-color: var(--pumpkin);
		width: 18px;
		height: 18px;
	}
	.error {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px;
		margin: 0 0 16px;
		border: 2px solid var(--pumpkin);
		border-radius: 8px;
	}
	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}
	.cta form {
		margin: 0;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 22px;
		font: inherit;
		font-size: 16px;
		font-weight: 700;
		border: 2px solid var(--pumpkin);
		border-radius: 999px;
		text-decoration: none;
		cursor: pointer;
	}
	.btn.primary {
		background: var(--pumpkin);
		color: var(--night);
	}
	.btn.ghost {
		background: transparent;
		color: var(--pumpkin);
	}
	.signout {
		margin-top: 16px;
	}
	.link {
		background: none;
		border: 0;
		padding: 0;
		font: inherit;
		color: var(--parchment-dim);
		text-decoration: underline;
		cursor: pointer;
	}
</style>
