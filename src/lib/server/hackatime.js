import { env } from '$env/dynamic/private';

const HACKATIME = 'https://hackatime.hackclub.com';
const ELIGIBILITY_CHECK = 'https://auth.hackclub.com/api/external/check';

export const SCOPES = 'profile read';

export function redirectUri(url) {
	return `${url.origin}/auth/hackatime/callback`;
}

export function authorizeUrl(url, state) {
	const params = new URLSearchParams({
		client_id: env.HACKATIME_CLIENT_ID,
		redirect_uri: redirectUri(url),
		response_type: 'code',
		scope: SCOPES,
		state
	});
	return `${HACKATIME}/oauth/authorize?${params}`;
}

export async function exchangeCode(url, code) {
	const res = await fetch(`${HACKATIME}/oauth/token`, {
		method: 'POST',
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: env.HACKATIME_CLIENT_ID,
			client_secret: env.HACKATIME_CLIENT_SECRET,
			code,
			redirect_uri: redirectUri(url),
			grant_type: 'authorization_code'
		})
	});
	if (!res.ok) throw new Error(`Hackatime token exchange failed (${res.status})`);
	const data = await res.json();
	return data.access_token;
}

async function api(token, path) {
	const res = await fetch(`${HACKATIME}${path}`, {
		headers: { authorization: `Bearer ${token}` }
	});
	if (res.status === 401) return null;
	if (!res.ok) throw new Error(`Hackatime ${path} failed (${res.status})`);
	return res.json();
}

export const getMe = (token) => api(token, '/api/v1/authenticated/me');

export async function getProjects(token) {
	const data = await api(token, '/api/v1/authenticated/projects');
	if (!data) return null;
	return data.projects
		.filter((p) => p.name && p.total_seconds > 0)
		.sort((a, b) => b.total_seconds - a.total_seconds);
}

export function isBanned(me) {
	return me.trust_factor?.trust_level === 'red';
}

async function checkOne(param, value) {
	const res = await fetch(`${ELIGIBILITY_CHECK}?${new URLSearchParams({ [param]: value })}`);
	if (!res.ok) return 'error';
	const data = await res.json();
	return data.result;
}

export async function eligibility(me) {
	const lookups = [];
	if (me.slack_id) lookups.push(['slack_id', me.slack_id]);
	for (const email of me.emails ?? []) lookups.push(['email', email]);

	let best = 'not_found';
	for (const [param, value] of lookups) {
		const result = await checkOne(param, value);
		if (result === 'verified_eligible') return result;
		if (result !== 'not_found' && result !== 'error') best = result;
	}
	return best;
}
