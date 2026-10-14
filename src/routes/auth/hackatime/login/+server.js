import { redirect } from '@sveltejs/kit';
import { randomBytes } from 'node:crypto';
import { authorizeUrl } from '$lib/server/hackatime.js';
import { STATE_COOKIE, cookieOptions } from '$lib/server/session.js';

export const prerender = false;
export const trailingSlash = 'ignore';

export function GET({ url, cookies }) {
	const state = randomBytes(16).toString('hex');
	cookies.set(STATE_COOKIE, state, { ...cookieOptions, maxAge: 600 });
	redirect(302, authorizeUrl(url, state));
}
