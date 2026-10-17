import { Archivo } from 'next/font/google';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
});

export const metadata = {
  title: 'Putta-Bucca Landscape Supplies',
  description: 'Your local supplier for garden, building, and landscape materials in Mudgee.',
  icons: {
    icon: [{ url: '/images/favicon.png', type: 'image/png' }],
    shortcut: ['/images/favicon.png'],
    apple: ['/images/favicon.png']
  }
};

export const viewport = {
  themeColor: '#183A27',
};

// Shared by the public site (app/(site)/layout.js) and the Keystatic editor (app/keystatic).
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
