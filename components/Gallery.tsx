'use client';
import Link from 'next/link';
import {useState,useRef,useEffect,type CSSProperties} from 'react';
import {projects,filters,type Locale,type Category} from '@/lib/content';
import ProjectVisual from './ProjectVisual';

const filterNames:Record<Category,{en:string;ar:string}>={All:{en:'All',ar:'الكل'},'UI/UX':{en:'UI/UX',ar:'UI/UX'},Development:{en:'Development',ar:'التطوير'},AI:{en:'AI',ar:'الذكاء الاصطناعي'},Data:{en:'Data',ar:'البيانات'}};
export default function Gallery({locale,standalone=false}:{locale:Locale;standalone?:boolean}) {
 const ar=locale==='ar';
 const Heading=standalone?'h1':'h2';
 const [filter,setFilter]=useState<Category>('All');
 const [active,setActive]=useState(0);
 const [mode,setMode]=useState<'gallery'|'grid'>('gallery');
 const visible=filter==='All'?projects:projects.filter(p=>p.category.includes(filter));
 const current=visible[Math.min(active,visible.length-1)];
 const start=useRef<number|null>(null);
 const dragged=useRef(false);
 const stage=useRef<HTMLDivElement>(null);
 const select=(next:number)=>setActive((next+visible.length)%visible.length);
 useEffect(()=> { setActive(0); },[filter]);
 return <section id="work" className={`work-section ${standalone?'standalone-work':''}`} aria-labelledby="work-title">
   <div className="work-top section-padding"><div><p className="eyebrow">{ar?'مختارات من أعمالي':'AN EXPLORATION IN SIX PARTS'}</p><Heading id="work-title">{ar?'أعمال مختارة':'Selected work'}<span className="count">(06)</span></Heading></div><p className="work-intro">{ar?'تجارب تُصمَّم. أنظمة تُبنى. وبيانات تصنع الفرق.':'Experiences designed. Systems built. Data made meaningful.'}</p></div>
   <div className="gallery-toolbar section-padding"><div className="filters" role="group" aria-label={ar?'تصفية المشاريع':'Filter projects'}>{filters.map(f=><button key={f} className={filter===f?'active':''} aria-pressed={filter===f} onClick={()=>{setFilter(f);setActive(0)}}>{filterNames[f][locale]}<sup>{f==='All'?projects.length:projects.filter(p=>p.category.includes(f)).length}</sup></button>)}</div><div className="view-controls" role="group" aria-label={ar?'طريقة العرض':'Display mode'}><button onClick={()=>setMode('gallery')} className={mode==='gallery'?'active':''} aria-label={ar?'عرض المعرض':'Gallery view'} aria-pressed={mode==='gallery'}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><path d="M8 5h8v14H8zM3 8h3v8H3zM18 8h3v8h-3z"/></svg></button><button onClick={()=>setMode('grid')} className={mode==='grid'?'active':''} aria-label={ar?'عرض الشبكة':'Grid view'} aria-pressed={mode==='grid'}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><path d="M3 4h7v6H3zM14 4h7v6h-7zM3 14h7v6H3zM14 14h7v6h-7z"/></svg></button></div></div>
   {mode==='gallery'?<>
     <div ref={stage} className="gallery-stage" tabIndex={0} role="region" aria-roledescription="carousel" aria-label={ar?'معرض المشاريع، استخدم أزرار التنقل أو اسحب':'Project gallery, use navigation controls or swipe'} onKeyDown={e=> {if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();e.currentTarget.focus({preventScroll:true});select(active+(e.key==='ArrowRight'?(ar?-1:1):(ar?1:-1)));}}} onPointerDown={e=>{start.current=e.clientX;dragged.current=false;}} onPointerUp={e=> {if(start.current!==null && Math.abs(e.clientX-start.current)>45){dragged.current=true;select(active+(e.clientX<start.current?(ar?-1:1):(ar?1:-1)));}start.current=null;}} onPointerCancel={()=>{start.current=null;}} onClickCapture={e=>{if(dragged.current){e.preventDefault();e.stopPropagation();dragged.current=false;}}}>
       {visible.map((p,i)=> {
         let offset=i-active;
         if(visible.length>3){if(offset>visible.length/2)offset-=visible.length;if(offset< -visible.length/2)offset+=visible.length;}
         if(ar) offset=-offset;
         const focused=i===active;
         return <div className={`gallery-card ${focused?'is-active':''}`} key={p.slug} style={{'--offset':offset,'--abs-offset':Math.abs(offset),zIndex:10-Math.abs(offset)} as CSSProperties} aria-hidden={!focused}>
           <div className="registration-corners" aria-hidden><i/><i/><i/><i/></div>
           {focused?<Link href={`/${locale}/work/${p.slug}`} className="card-link" draggable={false} aria-label={`${ar?'استكشف':'Explore'} ${p.title[locale]}`}><ProjectVisual project={p} locale={locale}/><span className="card-hover-label">{ar?'استكشف المشروع':'Explore project'}</span></Link>:<button className="side-card" tabIndex={-1} aria-label={p.title[locale]} onClick={()=>setActive(i)}><ProjectVisual project={p} locale={locale}/></button>}
         </div>;
       })}
     </div>
     <div className="gallery-caption section-padding"><div className="gallery-navigation"><button onClick={()=>select(active-1)} aria-label={ar?'المشروع السابق':'Previous project'} disabled={visible.length<2}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><path d="m14 5-7 7 7 7"/></svg></button><span dir="ltr">{String(active+1).padStart(2,'0')} <span>/ {String(visible.length).padStart(2,'0')}</span></span><button onClick={()=>select(active+1)} aria-label={ar?'المشروع التالي':'Next project'} disabled={visible.length<2}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><path d="m10 5 7 7-7 7"/></svg></button></div><div className="active-project-title" aria-live="polite" aria-atomic="true"><Link href={`/${locale}/work/${current.slug}`}><h3>{current.title[locale]}</h3></Link><p>{current.discipline[locale]}</p></div><Link className="text-link" href={`/${locale}/work/${current.slug}`}>{ar?'دراسة المشروع':'View case study'}<span className="link-dot" aria-hidden/></Link></div>
     <p className="swipe-note">{ar?'اسحب للاستكشاف أو استخدم أزرار التنقل':'SWIPE TO EXPLORE · OR USE THE CONTROLS'}</p>
   </>:<div className="project-grid section-padding" aria-live="polite">{visible.map(p=><Link href={`/${locale}/work/${p.slug}`} key={p.slug} className="grid-project"><ProjectVisual project={p} locale={locale}/><div className="grid-project-caption"><h3>{p.title[locale]}</h3><p>{p.discipline[locale]}</p></div></Link>)}</div>}
 </section>;
}
