import { redirect } from '@sveltejs/kit';
import { SESSION_COOKIE } from '$lib/server/session.js';

export const prerender = false;
export const trailingSlash = 'ignore';

export function POST({ cookies }) {
	cookies.delete(SESSION_COOKIE, { path: '/' });
	redirect(303, '/submit/');
}
