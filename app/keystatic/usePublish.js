'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Remembers a publish for a few minutes, so the button says "Going live" until Vercel
// has finished building it, rather than offering the same changes again.
const PENDING_KEY = 'pb-publish-pending';
const PENDING_FOR = 10 * 60 * 1000;

const readPending = () => {
  try {
    const pending = JSON.parse(sessionStorage.getItem(PENDING_KEY));
    return pending && Date.now() - pending.at < PENDING_FOR ? pending : null;
  } catch {
    return null;
  }
};

const writePending = (value) => {
  try {
    if (value) sessionStorage.setItem(PENDING_KEY, JSON.stringify(value));
    else sessionStorage.removeItem(PENDING_KEY);
  } catch {}
};

// Keystatic's login token lasts 8 hours; its refresh route renews it from the longer-lived cookie
async function request(method, url = '/api/publish') {
  let res = await fetch(url, { method, cache: 'no-store' });
  if (res.status === 401) {
    const refreshed = await fetch('/api/keystatic/github/refresh-token', { method: 'POST' });
    if (refreshed.ok) res = await fetch(url, { method, cache: 'no-store' });
  }
  const data = await res.json().catch(() => ({ error: 'failed' }));
  return res.ok ? data : { error: data.error || 'failed' };
}

const problemState = (error) => (error === 'login' || error === 'no-access' ? error : 'failed');

// state: loading | ready | publishing | going-live | login | no-access | failed
export function usePublish({ pollEvery }) {
  const [state, setState] = useState('loading');
  const [status, setStatus] = useState(null);
  const busy = useRef(false);

  const load = useCallback(async () => {
    if (busy.current) return;
    const pending = readPending();
    const data = await request('GET', pending ? `/api/publish?published=${pending.sha}` : undefined);
    if (busy.current) return;
    if (data.error) { setState(problemState(data.error)); return; }
    setStatus(data);
    if (pending && !data.publishedLive) {
      setState('going-live');
    } else {
      writePending(null);
      setState('ready');
    }
  }, []);

  // Check on open, every so often while the editor is in view, and when coming back to the tab
  useEffect(() => {
    load();
    const check = () => { if (document.visibilityState === 'visible') load(); };
    const timer = setInterval(check, pollEvery);
    window.addEventListener('focus', check);
    return () => {
      clearInterval(timer);
      window.removeEventListener('focus', check);
    };
  }, [load, pollEvery]);

  // Check again as soon as Keystatic saves. Every save or delete is a createCommitOnBranch
  // request to GitHub's GraphQL API, sent with the browser's fetch.
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const res = await originalFetch(...args);
      try {
        const [input, init] = args;
        const url = typeof input === 'string' ? input : input?.url;
        const isSave = url === 'https://api.github.com/graphql'
          && typeof init?.body === 'string'
          && init.body.includes('createCommitOnBranch');
        if (isSave && res.ok) setTimeout(load, 1000);
      } catch {}
      return res;
    };
    return () => { window.fetch = originalFetch; };
  }, [load]);

  const publish = async () => {
    busy.current = true;
    setState('publishing');
    const data = await request('POST');
    busy.current = false;
    if (data.error) { setState(problemState(data.error)); return; }
    writePending({ sha: data.sha, at: Date.now() });
    setState('going-live');
  };

  return { state, status, load, publish };
}
