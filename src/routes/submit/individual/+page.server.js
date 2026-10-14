import { fail, redirect } from '@sveltejs/kit';
import { eligibility, getMe, getProjects, isBanned } from '$lib/server/hackatime.js';
import { createSubmission, hasSubmitted, uploadAttachment } from '$lib/server/airtable.js';
import { checkRepo } from '$lib/server/github.js';
import { SESSION_COOKIE, unseal } from '$lib/server/session.js';

export const prerender = false;

const MAX_SCREENSHOT = 5 * 1024 * 1024;

async function account(cookies, url) {
	const session = unseal(cookies.get(SESSION_COOKIE));
	if (!session?.token) {
		if (url.searchParams.get('denied')) return { blocked: 'denied' };
		redirect(302, '/auth/hackatime/login');
	}

	const me = await getMe(session.token);
	if (!me) {
		cookies.delete(SESSION_COOKIE, { path: '/' });
		redirect(302, '/auth/hackatime/login');
	}
	if (isBanned(me)) return { blocked: 'banned' };

	const status = await eligibility(me);
	if (status !== 'verified_eligible') return { blocked: status };

	if (await hasSubmitted(me.id, me.emails ?? [])) return { blocked: 'already_submitted' };

	const projects = (await getProjects(session.token)) ?? [];
	return { me, projects };
}

export async function load({ cookies, url }) {
	const { me, blocked, projects } = await account(cookies, url);
	if (blocked) return { blocked };
	return {
		email: me.emails?.[0] ?? '',
		slackId: me.slack_id ?? '',
		githubUsername: me.github_username ?? '',
		projects: projects.map((p) => ({ name: p.name, hours: +(p.total_seconds / 3600).toFixed(1) }))
	};
}

const isUrl = (s) => {
	try {
		return new URL(s).protocol === 'https:';
	} catch {
		return false;
	}
};

const TEXT_FIELDS = [
	'firstName', 'lastName', 'birthday', 'githubUsername',
	'address1', 'address2', 'city', 'state', 'zip', 'country',
	'repoUrl', 'pagesUrl', 'description', 'features',
	'heardFrom', 'doingWell', 'improve', 'lapseLinks'
];
const REQUIRED = {
	firstName: 'Enter your first name.',
	lastName: 'Enter your last name.',
	birthday: 'Enter your birthday.',
	githubUsername: 'Enter your GitHub username.',
	address1: 'Enter your street address.',
	city: 'Enter your city.',
	state: 'Enter your state or province.',
	zip: 'Enter your ZIP or postal code.',
	country: 'Enter your country.',
	description: 'Describe your game.',
	features: 'List the 2-3 unique features you added.',
	heardFrom: 'Tell us how you heard about Ghost Ship.',
	doingWell: 'Tell us what we\'re doing well.',
	improve: 'Tell us how we can improve.'
};

export const actions = {
	default: async ({ cookies, request, url }) => {
		const { me, blocked, projects } = await account(cookies, url);
		if (blocked) return fail(403, { error: 'Your account can\'t submit right now. Reload the page to see why.' });

		const form = await request.formData();
		const values = Object.fromEntries(TEXT_FIELDS.map((k) => [k, String(form.get(k) ?? '').trim()]));
		values.tool = form.get('tool') === 'lapse' ? 'lapse' : 'hackatime';
		values.chosen = form.getAll('projects').map(String);
		values.bonus = form.getAll('bonus').map(String);
		const screenshot = form.get('screenshot');

		const invalid = (msg) => fail(400, { error: msg, values });
		for (const [key, msg] of Object.entries(REQUIRED)) {
			if (!values[key]) return invalid(msg);
		}
		if (!isUrl(values.repoUrl) || !values.repoUrl.includes('github.com/')) return invalid('Repo link must be a https://github.com/... link.');
		if (!isUrl(values.pagesUrl) || !values.pagesUrl.includes('.github.io')) return invalid('Pages link must be a https://....github.io link.');
		try {
			const repoProblem = await checkRepo(values.repoUrl);
			if (repoProblem) return invalid(repoProblem);
		} catch (e) {
			console.error(e);
			return invalid('We couldn\'t reach GitHub to check your repository. Try again in a minute.');
		}
		if (!(screenshot instanceof File) || screenshot.size === 0) return invalid('Add a screenshot of your game.');
		if (!screenshot.type.startsWith('image/')) return invalid('The screenshot must be an image.');
		if (screenshot.size > MAX_SCREENSHOT) return invalid('The screenshot must be under 5 MB.');

		let projectSummary = '';
		let lapseLinks = [];
		if (values.tool === 'hackatime') {
			const byName = new Map(projects.map((p) => [p.name, p]));
			values.chosen = values.chosen.filter((name) => byName.has(name));
			if (values.chosen.length === 0) return invalid('Pick at least one Hackatime project.');
			projectSummary = values.chosen
				.map((name) => `${name} (${(byName.get(name).total_seconds / 3600).toFixed(1)}h, all time)`)
				.join('\n');
		} else {
			lapseLinks = values.lapseLinks.split(/[\s,]+/).filter(Boolean);
			if (lapseLinks.length === 0) return invalid('Paste the link to every timelapse you recorded.');
			if (!lapseLinks.every(isUrl)) return invalid('Every timelapse link must start with https://');
		}

		let recordId;
		try {
			recordId = await createSubmission({
				'Code URL': values.repoUrl,
				'Playable URL': values.pagesUrl,
				'How did you hear about this?': values.heardFrom,
				'What are we doing well?': values.doingWell,
				'How can we improve?': values.improve,
				'First Name': values.firstName,
				'Last Name': values.lastName,
				'Email': me.emails?.[0] ?? '',
				'Description': values.description,
				'GitHub Username': values.githubUsername,
				'Address (Line 1)': values.address1,
				'Address (Line 2)': values.address2,
				'City': values.city,
				'State / Province': values.state,
				'Country': values.country,
				'ZIP / Postal Code': values.zip,
				'Birthday': values.birthday,
				'Justification - Submitter Hackatime ID': String(me.id),
				'Justification - Hackatime Project Name(s) + Date Range(s)': projectSummary,
				'Justification - Lapse Links, comma-separated': lapseLinks.join(', '),
				'Justification - Specific Technical Features': values.features,
				'Justification - Additional Justification': [
					me.slack_id && `Slack ID: ${me.slack_id}`,
					values.bonus.length && `Bonus challenges: ${values.bonus.join(', ')}`
				].filter(Boolean).join('\n')
			});
		} catch (e) {
			console.error(e);
			return fail(500, { error: 'Saving failed on our side. Try again in a minute, or ask in the Hack Club Slack.', values });
		}

		try {
			await uploadAttachment(recordId, 'Screenshot', screenshot);
		} catch (e) {
			console.error(`Screenshot upload failed for ${recordId}`, e);
		}

		return { success: true };
	}
};
