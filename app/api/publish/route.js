import { githubRepo } from '../../../keystatic.config';

// Saving in Keystatic commits to main but doesn't rebuild the site (see scripts/vercel-ignore-build.mjs).
// The Publish button in the editor (app/keystatic/PublishButton.js) uses this route: it lists what has
// been saved since the live build, and publishes it by adding an empty "Publish website changes" commit
// to main, which Vercel always builds.
// It acts as whoever is logged in to Keystatic, so only people who can edit the site can publish.

// Must match PUBLISH_COMMIT_MESSAGE in scripts/vercel-ignore-build.mjs
const PUBLISH_COMMIT_MESSAGE = 'Publish website changes';
const BRANCH = 'main';

export const dynamic = 'force-dynamic';

// The commit the live site was built from. Vercel sets VERCEL_GIT_COMMIT_SHA;
// LIVE_COMMIT_SHA lets you try the page locally against an older commit.
const liveSha = () => process.env.VERCEL_GIT_COMMIT_SHA || process.env.LIVE_COMMIT_SHA;

class GitHubError extends Error {
  constructor(status) {
    super(`GitHub responded ${status}`);
    this.status = status;
  }
}

async function github(token, path, { method = 'GET', body, raw = false } = {}) {
  const res = await fetch(`https://api.github.com/repos/${githubRepo}${path}`, {
    method,
    headers: {
      Accept: raw ? 'application/vnd.github.raw+json' : 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });
  if (!res.ok) throw new GitHubError(res.status);
  return raw ? res.text() : res.json();
}

// Keystatic keeps the logged-in editor's GitHub token in this cookie
const getToken = (request) => request.cookies.get('keystatic-gh-access-token')?.value;

const errorResponse = (err) => {
  if (err instanceof GitHubError && err.status === 401) {
    return Response.json({ error: 'login' }, { status: 401 });
  }
  if (err instanceof GitHubError && (err.status === 403 || err.status === 404)) {
    return Response.json({ error: 'no-access' }, { status: 403 });
  }
  console.error(err);
  return Response.json({ error: 'failed' }, { status: 502 });
};

const productName = async (token, slug) => {
  try {
    const yaml = await github(token, `/contents/content/products/${slug}.yaml?ref=${BRANCH}`, { raw: true });
    const line = yaml.match(/^name:\s*(.+)$/m)?.[1]?.trim();
    if (line) return line.replace(/^(['"])(.*)\1$/, '$2');
  } catch {}
  return slug;
};

export async function GET(request) {
  const token = getToken(request);
  if (!token) return Response.json({ error: 'login' }, { status: 401 });

  const live = liveSha();
  if (!live) return Response.json({ live: null, products: [], otherChanges: 0 });

  try {
    const compare = await github(token, `/compare/${live}...${BRANCH}`);

    // Group the changed files by product: its YAML file and anything in its photo folder
    const changes = new Map();
    let otherChanges = 0;
    for (const file of compare.files || []) {
      const entry = file.filename.match(/^content\/products\/([^/]+)\.yaml$/);
      const photo = file.filename.match(/^public\/images\/products\/([^/]+)\//);
      const slug = entry?.[1] || photo?.[1];
      if (!slug) { otherChanges += 1; continue; }
      const change = entry ? (file.status === 'added' ? 'added' : file.status === 'removed' ? 'removed' : 'changed') : 'changed';
      if (!changes.has(slug) || entry) changes.set(slug, change);
    }

    const products = await Promise.all([...changes].map(async ([slug, change]) => ({
      slug,
      change,
      name: change === 'removed' ? slug : await productName(token, slug),
    })));
    products.sort((a, b) => a.name.localeCompare(b.name));

    return Response.json({ live, products, otherChanges });
  } catch (err) {
    return errorResponse(err);
  }
}

export async function POST(request) {
  // Only accept presses from this site's own editor
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== request.headers.get('host')) {
    return Response.json({ error: 'forbidden' }, { status: 403 });
  }

  const token = getToken(request);
  if (!token) return Response.json({ error: 'login' }, { status: 401 });

  // An empty commit on top of main; retried once in case someone saved at the same moment
  for (let attempt = 1; ; attempt++) {
    try {
      const ref = await github(token, `/git/ref/heads/${BRANCH}`);
      const head = await github(token, `/git/commits/${ref.object.sha}`);
      const commit = await github(token, '/git/commits', {
        method: 'POST',
        body: { message: PUBLISH_COMMIT_MESSAGE, tree: head.tree.sha, parents: [head.sha] },
      });
      await github(token, `/git/refs/heads/${BRANCH}`, { method: 'PATCH', body: { sha: commit.sha, force: false } });
      return Response.json({ ok: true, sha: commit.sha });
    } catch (err) {
      if (attempt < 2 && err instanceof GitHubError && err.status === 422) continue;
      return errorResponse(err);
    }
  }
}
