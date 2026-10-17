'use client';

import { useCallback, useEffect, useState } from 'react';

const changeLabel = { added: 'New', changed: 'Changed', removed: 'Removed' };

// Keystatic's login token lasts 8 hours; its refresh route renews it from the longer-lived cookie
async function request(method) {
  let res = await fetch('/api/publish', { method, cache: 'no-store' });
  if (res.status === 401) {
    const refreshed = await fetch('/api/keystatic/github/refresh-token', { method: 'POST' });
    if (refreshed.ok) res = await fetch('/api/publish', { method, cache: 'no-store' });
  }
  const data = await res.json().catch(() => ({ error: 'failed' }));
  return res.ok ? data : { error: data.error || 'failed' };
}

const problemState = (error) => (error === 'login' || error === 'no-access' ? error : 'failed');

export default function PublishPanel() {
  // loading | ready | publishing | published | login | no-access | failed
  const [state, setState] = useState('loading');
  const [status, setStatus] = useState(null);

  const load = useCallback(async () => {
    setState('loading');
    const data = await request('GET');
    if (data.error) { setState(problemState(data.error)); return; }
    setStatus(data);
    setState('ready');
  }, []);

  useEffect(() => { load(); }, [load]);

  const publish = async () => {
    setState('publishing');
    const data = await request('POST');
    setState(data.error ? problemState(data.error) : 'published');
  };

  if (state === 'loading') return <p className="pub-note" role="status">Checking for changes…</p>;

  if (state === 'login') {
    return (
      <div className="pub-panel">
        <p>Log in to the editor first, then come back to this page.</p>
        <a className="pub-btn" href="/keystatic">Log in to the editor</a>
      </div>
    );
  }

  if (state === 'no-access') {
    return (
      <div className="pub-panel">
        <p>The GitHub account you're logged in with can't edit this website. Ask the site owner to add you, or log in with a different account.</p>
        <a className="pub-link" href="/api/keystatic/github/logout">Log out of the editor</a>
      </div>
    );
  }

  if (state === 'failed') {
    return (
      <div className="pub-panel">
        <p>Something went wrong talking to GitHub. Nothing has been published.</p>
        <button type="button" className="pub-btn" onClick={load}>Try again</button>
      </div>
    );
  }

  if (state === 'published') {
    return (
      <div className="pub-panel pub-done" role="status">
        <p><strong>Publishing now.</strong> Your changes will be on the website in about 2 minutes.</p>
        <div className="pub-actions">
          <a className="pub-btn" href="/">View the website</a>
          <a className="pub-link" href="/keystatic">Back to the editor</a>
        </div>
      </div>
    );
  }

  const { products = [], otherChanges = 0, live } = status || {};
  const waiting = products.length > 0 || otherChanges > 0;

  return (
    <div className="pub-panel">
      {live === null ? (
        <p>This page can only see what's live when it runs on the website itself.</p>
      ) : waiting ? (
        <>
          <h2>Waiting to go live</h2>
          <ul className="pub-list">
            {products.map((p) => (
              <li key={p.slug}>
                <span className={`pub-tag pub-tag-${p.change}`}>{changeLabel[p.change]}</span>
                {p.name}
              </li>
            ))}
            {otherChanges > 0 && (
              <li><span className="pub-tag">Other</span>{otherChanges} website {otherChanges === 1 ? 'update' : 'updates'}</li>
            )}
          </ul>
        </>
      ) : (
        <p>Everything you've saved is already live. There's nothing to publish.</p>
      )}
      <div className="pub-actions">
        <button type="button" className="pub-btn" onClick={publish} disabled={!waiting || state === 'publishing'}>
          {state === 'publishing' ? 'Publishing…' : 'Publish changes'}
        </button>
        <a className="pub-link" href="/keystatic">Back to the editor</a>
      </div>
    </div>
  );
}
