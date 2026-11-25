import type { Metadata, Viewport } from 'next';
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')).replace(/\/$/,'');
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Razan Adil — Design. Develop. Intelligence.', template: '%s — Razan Adil' },
  description: 'Razan Adil Alghamdi. UI/UX, front-end development, data science and AI agents. Selected work from Jeddah, Saudi Arabia.',
  applicationName: 'Razan Adil Portfolio',
  robots: { index: true, follow: true },
  openGraph: { title: 'Razan Adil — Design. Develop. Intelligence.', description: 'At the intersection of human experience and intelligent systems.', type: 'website', images: [{url:'/og-image.png', width:1200, height:630}] },
  twitter: { card: 'summary_large_image', title: 'Razan Adil — Design. Develop. Intelligence.' },
  icons: { icon: '/icon.svg' },
};
export const viewport: Viewport = { themeColor: '#201610', width: 'device-width', initialScale: 1 };
