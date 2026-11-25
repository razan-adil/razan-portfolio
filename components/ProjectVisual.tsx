import Image from 'next/image';
import type {Project,Locale} from '@/lib/content';

export default function ProjectVisual({project,locale,large=false}:{project:Project;locale:Locale;large?:boolean}) {
 const ar=locale==='ar';
 return <div className={`project-visual visual-${project.visual} ${large?'visual-large':''}`} style={{'--project-accent':project.accent} as React.CSSProperties}>
   {project.image ? <div className="real-project-frame"><div className="browser-dots" aria-hidden><i/><i/><i/><span>DClean · Streamlit</span></div><Image src={project.image} alt={project.imageAlt?.[locale]||project.title[locale]} width={1600} height={725} sizes={large?'(min-width: 1024px) 65vw, 100vw':'(min-width: 768px) 60vw, 85vw'} className="project-screenshot" /></div> : <>
     <div className="cover-grid" aria-hidden/>
     {project.visual==='jobs' && <div className="jobs-art"><span className="cover-kicker">WADI JEDDAH</span><span className="arabic-cover" lang="ar">فرصة<span className="cover-spark" aria-hidden>✳</span></span><span className="cover-subtitle">The next chapter starts here.</span><div className="cover-line"/><span className="cover-caption">JOBS & INTERNSHIPS</span></div>}
     {project.visual==='wajeeh' && <div className="wajeeh-art"><div className="agent-orbits" aria-hidden><i/><i/><i/><i/><i/></div><span lang="ar" className="wajeeh-word">وجيه</span><span className="cover-caption">INTELLIGENCE, WITH A HUMAN VOICE.</span></div>}
     {project.visual==='leadership' && <div className="leadership-art"><div className="leadership-arches" aria-hidden>{Array.from({length:6},(_,i)=><i key={i} style={{'--i':i} as React.CSSProperties}/>)}</div><span className="leadership-word">Your way<br/><em>to lead.</em></span><span className="cover-caption">AN ARABIC EXPERIENCE, REIMAGINED</span></div>}
     {project.visual==='dashboard' && <div className="dashboard-art"><div className="data-sculpture" aria-hidden>{[28,45,62,85,100,73,58,36].map((h,i)=><i key={i} style={{'--bar':`${h}%`,'--i':i} as React.CSSProperties}/>)}</div><span className="dashboard-word">From data.<br/><em>To direction.</em></span><span className="cover-caption">WADI JEDDAH · POWER BI</span></div>}
     {project.visual==='road' && <div className="road-art"><div className="road-lines" aria-hidden>{Array.from({length:9},(_,i)=><i key={i}/>)}</div><span className="road-word">Patterns<br/><em>beneath<br/>the surface.</em></span><span className="cover-caption">ROAD ACCIDENT SEVERITY · MACHINE LEARNING</span></div>}
   </>}
   <span className="visual-label">{project.image ? (ar?'صورة من المشروع الحقيقي':'ACTUAL PROJECT IMAGE') : (ar?'غلاف بصري للمشروع':'EDITORIAL PROJECT COVER')}</span>
 </div>;
}
