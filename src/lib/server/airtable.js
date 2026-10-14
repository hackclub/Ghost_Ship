import { env } from '$env/dynamic/private';

function config() {
	if (!env.AIRTABLE_TOKEN || !env.AIRTABLE_BASE_ID) {
		throw new Error('AIRTABLE_TOKEN and AIRTABLE_BASE_ID must be set');
	}
	return {
		base: env.AIRTABLE_BASE_ID,
		table: encodeURIComponent(env.AIRTABLE_TABLE || 'YSWS Project Submission'),
		headers: { authorization: `Bearer ${env.AIRTABLE_TOKEN}`, 'content-type': 'application/json' }
	};
}

const quote = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

export async function hasSubmitted(hackatimeId, emails) {
	const { base, table, headers } = config();
	const checks = [`{Justification - Submitter Hackatime ID} = ${quote(hackatimeId)}`];
	for (const email of emails) checks.push(`LOWER({Email}) = ${quote(email.toLowerCase())}`);
	const params = new URLSearchParams({
		filterByFormula: `OR(${checks.join(', ')})`,
		maxRecords: '1',
		'fields[]': 'Email'
	});
	const res = await fetch(`https://api.airtable.com/v0/${base}/${table}?${params}`, { headers });
	if (!res.ok) throw new Error(`Airtable lookup failed (${res.status}): ${await res.text()}`);
	return (await res.json()).records.length > 0;
}

export async function createSubmission(fields) {
	const { base, table, headers } = config();
	const res = await fetch(`https://api.airtable.com/v0/${base}/${table}`, {
		method: 'POST',
		headers,
		body: JSON.stringify({ fields })
	});
	if (!res.ok) throw new Error(`Airtable save failed (${res.status}): ${await res.text()}`);
	return (await res.json()).id;
}

export async function uploadAttachment(recordId, field, file) {
	const { base, headers } = config();
	const res = await fetch(
		`https://content.airtable.com/v0/${base}/${recordId}/${encodeURIComponent(field)}/uploadAttachment`,
		{
			method: 'POST',
			headers,
			body: JSON.stringify({
				contentType: file.type,
				filename: file.name,
				file: Buffer.from(await file.arrayBuffer()).toString('base64')
			})
		}
	);
	if (!res.ok) throw new Error(`Airtable upload failed (${res.status}): ${await res.text()}`);
}
