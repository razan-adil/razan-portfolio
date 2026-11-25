import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Motion from '@/components/Motion';
import type { Locale } from '@/lib/content';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource/ibm-plex-sans-arabic/400.css';
import '@fontsource/ibm-plex-sans-arabic/500.css';
import '@fontsource/ibm-plex-sans-arabic/700.css';
import 'lenis/dist/lenis.css';
import '@/app/globals.css';
export { metadata, viewport } from '@/lib/metadata';
export function generateStaticParams() { return [{ locale: 'en' }, { locale: 'ar' }]; }
export default async function LocaleLayout({children, params}: {children:React.ReactNode; params:Promise<{locale:string}>}) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'ar') notFound();
  return <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}><body><div className="site-shell" lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
    <a className="skip-link" href="#main">{locale === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}</a>
    <Header locale={locale as Locale}/><Motion locale={locale as Locale}>{children}</Motion>
  </div></body></html>;
}
