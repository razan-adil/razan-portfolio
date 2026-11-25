import Link from 'next/link';
import {notFound} from 'next/navigation';
import Ambient from '@/components/Ambient';
import Gallery from '@/components/Gallery';
import Beyond from '@/components/Beyond';
import Footer from '@/components/Footer';
import {profile,type Locale} from '@/lib/content';
import type {Metadata} from 'next';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;return {title:{absolute:locale==='ar'?'رزان عادل — تصميم. تطوير. ذكاء.':'Razan Adil — Design. Develop. Intelligence.'},alternates:{languages:{en:'/en',ar:'/ar'}}};}
export default async function Home({params}:{params:Promise<{locale:string}>}) {
 const {locale:l}=await params;if(l!=='en'&&l!=='ar')notFound();const locale=l as Locale;const ar=locale==='ar';
 const person={ '@context':'https://schema.org','@type':'Person',name:profile.name.en,alternateName:profile.name.ar,description:profile.about[locale],sameAs:[profile.github,profile.linkedin,profile.x],knowsAbout:['UI/UX Design','Front-End Development','Data Science','AI Agents','Workflow Automation'],homeLocation:{'@type':'Place',name:profile.location.en}};
 return <main id="main">
   <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person).replace(/</g,'\\u003c')}}/>
   <section className="hero" aria-labelledby="hero-title">
     <div className="hero-art"><Ambient/><div className="ambient-halo"/><div className="scene-floor"/></div>
     <div className="hero-meta" data-reveal><span>{ar?'رزان عادل الغامدي':'RAZAN ADIL ALGHAMDI'}</span><span>{ar?'جدّة، المملكة العربية السعودية':'BASED IN JEDDAH, SAUDI ARABIA'}</span></div>
     <h1 id="hero-title" className="hero-title" aria-label={ar?'تصميم. تطوير. ذكاء.':'Design. Develop. Intelligence.'}><span className="hero-word word-design" data-reveal>{ar?'تصميم.':'Design.'}</span><span className="hero-word word-develop" data-reveal>{ar?'تطوير.':'Develop.'}</span><span className="hero-word word-intelligence" data-reveal>{ar?'ذكاء.':'Intelligence.'}</span></h1>
     <div className="hero-bottom" data-reveal><p>{ar?<>أربط بين التجربة الإنسانية<br/>وإمكانات التقنية والذكاء.</>:<>Connecting human experience<br/>with digital intelligence.</>}</p><a href="#work" className="hero-scroll"><span>{ar?'استكشف الأعمال':'Scroll to explore'}</span><span className="scroll-line" aria-hidden/></a><p className="hero-disciplines" dir="ltr">UI/UX · FRONT-END<br/>DATA SCIENCE · AI AGENTS</p></div>
     <div className="hero-grain" aria-hidden/>
   </section>
   <Gallery locale={locale}/>
   <section className="intro-section section-padding" aria-labelledby="intro-title"><div className="intro-top"><p className="eyebrow">{ar?'إنسانة فضولية. مجالات مترابطة.':'ONE CURIOUS MIND. CONNECTED DISCIPLINES.'}</p><span aria-hidden className="intro-star">✳</span></div><h2 id="intro-title" data-scroll-reveal>{ar?<>أُصمّم ما نراه.<br/>وأبني ما <span className="serif">يُحرّكه.</span></>:<>I shape what you see.<br/>And build what<br/><span className="serif">makes it work.</span></>}</h2><div className="intro-bottom" data-scroll-reveal><span className="intro-name">{profile.name[locale]}</span><div><p>{profile.about[locale]}</p><Link href={`/${locale}/about`} className="text-link">{ar?'المزيد عنّي':'A little more about me'}<span className="link-dot" aria-hidden/></Link></div></div></section>
   <Beyond locale={locale}/><Footer locale={locale}/>
 </main>;
}
