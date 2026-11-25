import Link from 'next/link';
import { profile, type Locale } from '@/lib/content';

export default function Footer({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const ar = locale === 'ar';
  return (
    <footer className={`footer ${compact ? 'compact' : ''}`}>
      {!compact && <>
        <p className="eyebrow">{ar ? 'انطلاقًا من مبدأ' : 'ON THE PRINCIPLE THAT'}</p>
        <a className="footer-title" href={`mailto:${profile.email}`} dir={ar ? 'rtl' : 'ltr'}>
          <span className="footer-title-line">{ar ? 'لسّه فيه شيء' : 'There’s still more'}</span>
          <span className="footer-title-line serif">{ar ? 'ما جرّبته.' : 'I haven’t tried.'}</span>
          <span aria-hidden className="footer-asterisk">✳</span>
        </a>
        <div className="contact-mail">
          <a href={`mailto:${profile.email}`} lang="en" dir="ltr">{profile.email}</a>
          <a href={profile.whatsapp} lang="en" dir="ltr" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </>}
      <div className="footer-bottom">
        <Link className="footer-brand" href={`/${locale}`} lang="en" dir="ltr">Razan Adil <span>© {new Date().getFullYear()}</span></Link>
        <div className="social-links" lang="en" dir="ltr">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={profile.x} target="_blank" rel="noopener noreferrer">X</a>
        </div>
        <Link href={`/${locale}/privacy`}>{ar ? 'الخصوصية' : 'Privacy'}</Link>
        <a href="#main">{ar ? 'للأعلى' : 'Back to top'}</a>
      </div>
    </footer>
  );
}
