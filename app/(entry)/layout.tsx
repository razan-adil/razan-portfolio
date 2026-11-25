import '@/app/globals.css';
export { metadata, viewport } from '@/lib/metadata';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" dir="ltr"><body>{children}</body></html>;
}
