import './publish.css';
import PublishPanel from './PublishPanel';

export const metadata = {
  title: 'Publish website changes',
  robots: { index: false, follow: false },
};

export default function PublishPage() {
  return (
    <div className="pub">
      <main className="pub-card">
        <img className="pub-mark" src="/images/favicon.png" alt="" width="40" height="40" />
        <h1>Publish website changes</h1>
        <p className="pub-lead">
          Saving a product in the editor keeps your changes ready but doesn't change the website.
          When you're happy with everything, publish it here and it goes live in about 2 minutes.
        </p>
        <PublishPanel />
      </main>
    </div>
  );
}
