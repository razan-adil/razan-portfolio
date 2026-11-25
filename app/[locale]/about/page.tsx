import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Footer from '@/components/Footer';
import {profile,type Locale} from '@/lib/content';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;return {title:locale==='ar'?'عنّي':'About'};}
export default async function About({params}:{params:Promise<{locale:string}>}){
 const {locale:l}=await params;if(l!=='en'&&l!=='ar')notFound();const locale=l as Locale;const ar=locale==='ar';
 const disciplines=ar?[
 ['تصميم UI/UX','أصمّم تجارب وواجهات عربية، وأهتم بتسلسل المعلومات ووضوح الرحلة وتفاصيل الحركة.'],
 ['تطوير الواجهات','أحوّل الواجهات إلى تجارب قابلة للاستخدام، من صفحات الفرص إلى لوحات المستخدمين والإدارة.'],
 ['علوم البيانات','أعمل على تجهيز البيانات والتحقق من جودتها وتحليلها وتصوّرها لدعم فهمها.'],
 ['وكلاء الذكاء الاصطناعي والأتمتة','أجهّز المعرفة والتعليمات ونبرة الحوار لوكلاء الذكاء الاصطناعي، وأبني مسارات لأتمتة سير العمل.'],
 ]:[
 ['UI/UX Design','Shaping Arabic experiences through clear information, thoughtful journeys and purposeful motion.'],
 ['Front-End Development','Bringing interfaces into use, from opportunity listings to user and admin dashboards.'],
 ['Data Science','Preparing, validating, analyzing and visualizing data to make it easier to understand.'],
 ['AI Agents & Automation','Connecting knowledge, instructions and a considered tone of voice with automated workflows.'],
 ];
 return <main id="main" className="about-page"><section className="about-hero section-padding"><p className="eyebrow" data-reveal>{profile.name[locale]} · {profile.location[locale]}</p><h1 data-reveal>{ar?<>فضول واحد.<br/>وإمكانات <span className="serif">متقاطعة.</span></>:<>Curiosity has<br/>more than<br/><span className="serif">one language.</span></>}</h1><div className="about-summary" data-reveal><span className="eyebrow">{ar?'تصميم. تطوير. ذكاء.':'DESIGN. DEVELOP. INTELLIGENCE.'}</span><p>{profile.about[locale]}</p></div></section><section className="discipline-section section-padding"><p className="eyebrow">{ar?'المجالات التي تجمع عملي':'THE INTERSECTIONS I WORK IN'}</p><h2 data-scroll-reveal>{ar?'أربعة مجالات. رؤية مترابطة.':'Four disciplines.<br/>One connected perspective.'}</h2>{disciplines.map(([name,description])=><div className="discipline-row" key={name} data-scroll-reveal><h3>{name}</h3><p>{description}</p></div>)}</section><section className="journey section-padding"><div><p className="eyebrow">{ar?'أتعلم وأطبّق':'LEARNING, THROUGH MAKING'}</p><h2>{ar?'حيث أنا اليوم.':'Where I am now.'}</h2></div><div><article className="journey-row" data-scroll-reveal><p className="eyebrow">{ar?'الخبرة الحالية':'CURRENT WORK'}</p><h3>{ar?'وادي جدة — مركز الابتكار':'Wadi Jeddah — Innovation Center'}</h3><p>{ar?'أعمل بدوام جزئي في قسم التقنية، وأساهم في تجارب رقمية ومشاريع بيانات ووكلاء ذكاء اصطناعي وأتمتة.':'Working part-time in the Technology Department, contributing to digital experiences, data projects, AI agents and workflow automation.'}</p></article><article className="journey-row" data-scroll-reveal><p className="eyebrow">{ar?'الدراسة':'EDUCATION'}</p><h3>{ar?'علوم البيانات — جامعة جدة':'Data Science — University of Jeddah'}</h3><p>{ar?'طالبة في سنة التخرج، أستكشف تطبيقات البيانات والتعلّم الآلي من خلال مشاريع جامعية جماعية.':'A final-year student exploring data and machine learning through collaborative university projects.'}</p></article></div></section><Footer locale={locale}/></main>;
}
