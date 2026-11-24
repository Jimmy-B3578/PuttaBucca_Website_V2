// Vercel "Ignored Build Step" (see vercel.json). Exit 0 skips the build, exit 1 builds.
//
// Saving in Keystatic commits product changes to main, but they should only go live
// when someone presses Publish in the editor. So on production:
// - a "Publish website changes" commit (made by the publish button) always builds
// - a change that only touches product content, since the last successful deploy, is skipped
// - anything else, like a code change, builds as normal (and takes any saved products with it)
//
// Compare with the last successful deployment, not the previous commit. Vercel cancels
// the older deployment when a newer commit lands, and a merge can make the tip commit
// look like a product-only edit even when code further back never went live.
import { execSync } from 'node:child_process';

// Must match PUBLISH_COMMIT_MESSAGE in app/api/publish/route.js
const PUBLISH_COMMIT_MESSAGE = 'Publish website changes';
const contentPaths = [/^content\//, /^public\/images\/products\//];

const build = (reason) => { console.log(`Building: ${reason}`); process.exit(1); };
const skip = (reason) => { console.log(`Skipping build: ${reason}`); process.exit(0); };

if (process.env.VERCEL_ENV !== 'production') build('not a production deployment');
if ((process.env.VERCEL_GIT_COMMIT_MESSAGE || '').startsWith(PUBLISH_COMMIT_MESSAGE)) build('publish requested');

// Vercel only sets this for the Ignored Build Step: the SHA of the last deployment that finished.
const previous = process.env.VERCEL_GIT_PREVIOUS_SHA || '';
const base = /^[0-9a-f]{7,40}$/i.test(previous) ? previous : '';

let files;
try {
  if (!base) build('no previous deployment to compare');
  execSync(`git cat-file -e ${base}^{commit}`, { stdio: 'ignore' });
  files = execSync(`git diff --name-only ${base} HEAD`, { encoding: 'utf8' }).split('\n').filter(Boolean);
} catch {
  build('could not read the changed files');
}

if (files.length > 0 && files.every((f) => contentPaths.some((re) => re.test(f)))) {
  skip('only product content changed; it goes live when someone presses Publish');
}
build('code changed');
