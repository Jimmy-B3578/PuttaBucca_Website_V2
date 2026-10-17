'use client';

import './publish-button.css';
import { useEffect, useRef, useState } from 'react';
import { usePublish } from './usePublish';

const changeLabel = { added: 'New', changed: 'Changed', removed: 'Removed' };

// A floating button in the corner of the Keystatic editor. Saving in Keystatic doesn't change the
// live website; this shows what's waiting and sends it all live in one go.
export default function PublishButton() {
  const { state, status, load, publish } = usePublish({ pollEvery: 30000 });
  const [open, setOpen] = useState(false);
  const root = useRef(null);

  // Close on Escape or a click elsewhere in the editor
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e) => { if (root.current && !root.current.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  // Nothing to show until someone is logged in with access to the site
  if (state === 'loading' || state === 'login' || state === 'no-access') return null;

  const { products = [], otherChanges = 0, live } = status || {};
  const count = products.length + otherChanges;
  const waiting = count > 0 && live !== null;

  let pill;
  if (state === 'failed') {
    pill = <button type="button" className="kpub-pill kpub-pill-quiet" onClick={load}>Couldn't check for changes · Try again</button>;
  } else if (state === 'going-live') {
    pill = <span className="kpub-pill kpub-pill-quiet" role="status"><span className="kpub-dot" aria-hidden="true" />Publishing, live in about 2 minutes</span>;
  } else {
    pill = (
      <button
        type="button"
        className={`kpub-pill ${waiting ? '' : 'kpub-pill-quiet'}`}
        aria-expanded={open}
        aria-controls="kpub-panel"
        onClick={() => {
          // Re-check when opening so the list is current
          if (!open) load();
          setOpen((o) => !o);
        }}
      >
        {waiting ? <>Publish changes <span className="kpub-count">{count}</span></> : 'Website up to date'}
      </button>
    );
  }

  return (
    <div className="kpub" ref={root}>
      {open && (state === 'ready' || state === 'publishing') && (
        <div className="kpub-panel" id="kpub-panel" role="dialog" aria-label="Publish website changes">
          {live === null ? (
            <p>The publish button only works on the live website.</p>
          ) : waiting ? (
            <>
              <h2>Waiting to go live</h2>
              <ul className="kpub-list">
                {products.map((p) => (
                  <li key={p.slug}>
                    <span className={`kpub-tag kpub-tag-${p.change}`}>{changeLabel[p.change]}</span>
                    {p.name}
                  </li>
                ))}
                {otherChanges > 0 && (
                  <li><span className="kpub-tag">Other</span>{otherChanges} website {otherChanges === 1 ? 'update' : 'updates'}</li>
                )}
              </ul>
              <button
                type="button"
                className="kpub-publish"
                disabled={state === 'publishing'}
                onClick={async () => { await publish(); setOpen(false); }}
              >
                {state === 'publishing' ? 'Publishing…' : 'Publish to website'}
              </button>
              <p className="kpub-note">Everything above goes live in about 2 minutes.</p>
            </>
          ) : (
            <p>Everything you've saved is already on the website.</p>
          )}
        </div>
      )}
      {pill}
    </div>
  );
}
