import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Footer from '@/components/Footer';
import CopyEmail from '@/components/CopyEmail';
import {profile,type Locale} from '@/lib/content';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;return {title:locale==='ar'?'تواصل':'Contact'};}
export default async function Contact({params}:{params:Promise<{locale:string}>}){
 const {locale:l}=await params;if(l!=='en'&&l!=='ar')notFound();const locale=l as Locale;const ar=locale==='ar';
 return <main id="main" className="contact-page"><section className="contact-main section-padding"><p className="eyebrow" data-reveal>{ar?'الخطوة القادمة تبدأ بحوار':'THE NEXT CHAPTER STARTS WITH A CONVERSATION'}</p><h1 data-reveal>{ar?<>فكرة تستحق<br/><span className="serif">أن نتحدث.</span></>:<>Something<br/>on your <span className="serif">mind?</span></>}</h1><div className="contact-columns" data-reveal><p>{ar?'للتعاون في التصميم أو تطوير الواجهات أو البيانات والذكاء الاصطناعي، يسعدني أن أسمع منك.':'Have a project at the intersection of design, development, data or AI? I’d love to hear about it.'}</p><div><div className="contact-methods"><a href={`mailto:${profile.email}`}><span>{ar?'البريد الإلكتروني':'EMAIL'}</span><span dir="ltr">{profile.email}</span></a><CopyEmail email={profile.email} locale={locale}/><a href={profile.whatsapp} target="_blank" rel="noopener noreferrer"><span>WHATSAPP</span><span dir="ltr">+966 50 288 2129</span></a><a href={`tel:${profile.phone}`}><span>{ar?'اتصال':'PHONE'}</span><span dir="ltr">+966 50 288 2129</span></a></div><div className="contact-socials"><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a><a href={profile.x} target="_blank" rel="noopener noreferrer">X</a></div></div></div></section><Footer locale={locale} compact/></main>;
}
