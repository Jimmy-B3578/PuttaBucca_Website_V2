import KeystaticApp from './keystatic';
import PublishButton from './PublishButton';
import config from '../../keystatic.config';

export const metadata = {
  title: 'Putta Bucca editor',
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  return (
    <>
      <KeystaticApp />
      {/* Only GitHub mode needs publishing; local edits are just files on your computer */}
      {config.storage.kind === 'github' && <PublishButton />}
    </>
  );
}
