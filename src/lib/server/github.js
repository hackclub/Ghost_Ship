export function parseRepo(url) {
	try {
		const u = new URL(url);
		if (u.hostname !== 'github.com') return null;
		const [owner, repo] = u.pathname.split('/').filter(Boolean);
		if (!owner || !repo) return null;
		return { owner, repo: repo.replace(/\.git$/, '') };
	} catch {
		return null;
	}
}

const README_NAMES = ['README.md', 'readme.md', 'Readme.md', 'README', 'README.txt'];

async function exists(url) {
	const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
	if (res.status === 404) return false;
	if (!res.ok) throw new Error(`GitHub check failed for ${url} (${res.status})`);
	return true;
}

export async function checkRepo(url) {
	const parsed = parseRepo(url);
	if (!parsed) return 'Code URL must be a link to a GitHub repository, like https://github.com/you/ghost-hunt';
	const { owner, repo } = parsed;

	if (!(await exists(`https://github.com/${owner}/${repo}`))) {
		return 'We couldn\'t find your GitHub repository. Check the link, and make sure the repo is public (Settings → General → Danger Zone → Change visibility).';
	}

	for (const name of README_NAMES) {
		if (await exists(`https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${name}`)) return null;
	}
	return 'Your GitHub repository needs a README. Add a README.md that says what your game is and how to play, then submit again.';
}
