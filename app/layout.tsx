import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KGM CINEMATIC STUDIO OS — Kurra Greenfield Merchants Limited',
  description:
    'A proprietary cinematic production environment for transforming architectural photography into master-grade property films, social cuts and client presentation experiences.',
  keywords: [
    'KGM Limited',
    'Kurra Greenfield Merchants',
    'Luxury Real Estate Cinema',
    'AI Architectural Video',
    'Cinematic Walkthrough',
    'ACES 2065-1',
    'Riyadh Luxury Real Estate',
  ],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#07130E] text-stone-100 antialiased selection:bg-[#C5A869]/30">
        {children}
      </body>
    </html>
  );
}
