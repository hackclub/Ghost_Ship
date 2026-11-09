import { redirect } from '@sveltejs/kit';
import { randomBytes } from 'node:crypto';
import { authorizeUrl } from '$lib/server/hackatime.js';
import { STATE_COOKIE, cookieOptions } from '$lib/server/session.js';
import { SUBMISSIONS_OPEN } from '$lib/links.js';

export const prerender = false;
export const trailingSlash = 'ignore';

export function GET({ url, cookies }) {
	if (!SUBMISSIONS_OPEN) redirect(302, '/submit/individual/');
	const state = randomBytes(16).toString('hex');
	cookies.set(STATE_COOKIE, state, { ...cookieOptions, maxAge: 600 });
	redirect(302, authorizeUrl(url, state));
}
