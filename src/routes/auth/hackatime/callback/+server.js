import { error, redirect } from '@sveltejs/kit';
import { exchangeCode } from '$lib/server/hackatime.js';
import { SESSION_COOKIE, STATE_COOKIE, cookieOptions, seal } from '$lib/server/session.js';

export const prerender = false;
export const trailingSlash = 'ignore';

export async function GET({ url, cookies }) {
	const expected = cookies.get(STATE_COOKIE);
	cookies.delete(STATE_COOKIE, { path: '/' });

	if (url.searchParams.get('error')) redirect(302, '/submit/individual/?denied=1');

	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	if (!code || !state || state !== expected) error(400, 'Sign-in expired. Go back and press Submit again.');

	const token = await exchangeCode(url, code);
	cookies.set(SESSION_COOKIE, seal({ token }), { ...cookieOptions, maxAge: 60 * 60 * 24 * 7 });
	redirect(302, '/submit/individual/');
}
