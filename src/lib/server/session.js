import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';
import { env } from '$env/dynamic/private';

export const SESSION_COOKIE = 'gs_session';
export const STATE_COOKIE = 'gs_oauth_state';

function key() {
	if (!env.SESSION_SECRET) throw new Error('SESSION_SECRET is not set');
	return createHash('sha256').update(env.SESSION_SECRET).digest();
}

export function seal(data) {
	const iv = randomBytes(12);
	const cipher = createCipheriv('aes-256-gcm', key(), iv);
	const body = Buffer.concat([cipher.update(JSON.stringify(data), 'utf8'), cipher.final()]);
	return Buffer.concat([iv, cipher.getAuthTag(), body]).toString('base64url');
}

export function unseal(value) {
	if (!value) return null;
	try {
		const raw = Buffer.from(value, 'base64url');
		const decipher = createDecipheriv('aes-256-gcm', key(), raw.subarray(0, 12));
		decipher.setAuthTag(raw.subarray(12, 28));
		const text = Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]).toString('utf8');
		return JSON.parse(text);
	} catch {
		return null;
	}
}

export const cookieOptions = {
	path: '/',
	httpOnly: true,
	sameSite: 'lax'
};
