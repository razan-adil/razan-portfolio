import Link from 'next/link';
import {profile,type Locale} from '@/lib/content';
export default function Footer({locale,compact=false}:{locale:Locale;compact?:boolean}) {
 const ar=locale==='ar';
 return <footer className={`footer ${compact?'compact':''}`}>
   {!compact && <><p className="eyebrow">{ar?'الفكرة الجيّدة تبدأ بحوار':'GOOD THINGS START WITH A CONVERSATION'}</p><a className="footer-title" href={`mailto:${profile.email}`}>{ar?'لنصنع شيئًا':'Let’s make'}<br/><span className="serif">{ar?'يستحق.':'it matter.'}</span><span aria-hidden className="footer-asterisk">✳</span></a><div className="contact-mail"><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></div></>}
   <div className="footer-bottom"><Link className="footer-brand" href={`/${locale}`}>Razan Adil <span>© {new Date().getFullYear()}</span></Link><div className="social-links"><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a><a href={profile.x} target="_blank" rel="noopener noreferrer">X</a></div><Link href={`/${locale}/privacy`}>{ar?'الخصوصية':'Privacy'}</Link><a href="#main">{ar?'للأعلى':'Back to top'}</a></div>
 </footer>;
}
