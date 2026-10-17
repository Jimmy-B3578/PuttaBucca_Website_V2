import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

// On the live site GitHub mode needs the GitHub App's details in Vercel's environment.
// Until they are added, answer with a message instead of failing the build.
// (In development Keystatic handles a missing app itself, with its one-time setup screen.)
const gitHubReady = process.env.NODE_ENV !== 'production' || config.storage.kind !== 'github' || Boolean(
  process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
  process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
  process.env.KEYSTATIC_SECRET
);

const notSetUp = () => new Response(
  'Keystatic is not connected to GitHub yet. Add KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET and NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG.',
  { status: 503 }
);

export const { POST, GET } = gitHubReady
  ? makeRouteHandler({ config })
  : { POST: notSetUp, GET: notSetUp };
