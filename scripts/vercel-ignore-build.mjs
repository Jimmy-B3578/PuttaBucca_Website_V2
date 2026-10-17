// Vercel "Ignored Build Step" (see vercel.json). Exit 0 skips the build, exit 1 builds.
//
// Saving in Keystatic commits product changes to main, but they should only go live
// when someone presses Publish in the editor. So on production:
// - a "Publish website changes" commit (made by the publish button) always builds
// - a commit that only touches product content is skipped (it waits for the next publish)
// - anything else, like a code change, builds as normal (and takes any saved products with it)
import { execSync } from 'node:child_process';

// Must match PUBLISH_COMMIT_MESSAGE in app/api/publish/route.js
const PUBLISH_COMMIT_MESSAGE = 'Publish website changes';
const contentPaths = [/^content\//, /^public\/images\/products\//];

const build = (reason) => { console.log(`Building: ${reason}`); process.exit(1); };
const skip = (reason) => { console.log(`Skipping build: ${reason}`); process.exit(0); };

if (process.env.VERCEL_ENV !== 'production') build('not a production deployment');
if ((process.env.VERCEL_GIT_COMMIT_MESSAGE || '').startsWith(PUBLISH_COMMIT_MESSAGE)) build('publish requested');

let files;
try {
  files = execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf8' }).split('\n').filter(Boolean);
} catch {
  build('could not read the changed files');
}

if (files.length > 0 && files.every((f) => contentPaths.some((re) => re.test(f)))) {
  skip('only product content changed; it goes live when someone presses Publish');
}
build('code changed');
