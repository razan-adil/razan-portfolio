'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useState, useRef} from 'react';
import type {Locale} from '@/lib/content';

export default function Header({locale}: {locale:Locale}) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef=useRef<HTMLElement>(null);
  const toggleRef=useRef<HTMLButtonElement>(null);
  const ar = locale === 'ar';
  const otherPath = path.replace(/^\/(en|ar)(?=\/|$)/, ar ? '/en' : '/ar');
  useEffect(()=> { setOpen(false); },[path]);
  useEffect(()=> {
    const desktop=window.matchMedia('(min-width:1024px)');
    const close=()=>{if(desktop.matches)setOpen(false)};
    desktop.addEventListener('change',close);
    return ()=>desktop.removeEventListener('change',close);
  },[]);
  useEffect(()=> {
    if (!open) return;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const frame=requestAnimationFrame(()=>headerRef.current?.querySelector<HTMLAnchorElement>('.mobile-nav a')?.focus());
    const escape = (e:KeyboardEvent)=> {
      if(e.key === 'Escape') setOpen(false);
      if(e.key === 'Tab') {
        const links=Array.from(headerRef.current?.querySelectorAll<HTMLElement>('a,button')||[]).filter(el=>el.getClientRects().length>0);
        const first=links[0],last=links[links.length-1];
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
        if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
      }
    };
    window.addEventListener('keydown',escape);
    return ()=>{window.removeEventListener('keydown',escape);cancelAnimationFrame(frame);document.body.style.overflow=previousOverflow;toggleRef.current?.focus({preventScroll:true});};
  },[open]);
  return <header ref={headerRef} className={`header ${open ? 'menu-is-open' : ''}`}>
    <Link className="wordmark" href={`/${locale}`} aria-label={ar ? 'رزان عادل — الرئيسية' : 'Razan Adil — Home'}>razan<span className="wordmark-star" aria-hidden>✳</span></Link>
    <nav aria-label={ar ? 'التنقل الرئيسي' : 'Main navigation'} className="desktop-nav">
      {(['work','about','contact'] as const).map((item,i)=><Link key={item} href={`/${locale}/${item}`} aria-current={path===`/${locale}/${item}` ? 'page' : undefined}>{(ar?['الأعمال','عنّي','تواصل']:['Work','About','Contact'])[i]}</Link>)}
    </nav>
    <div className="header-actions">
      <Link className="language-switch" href={otherPath} hrefLang={ar?'en':'ar'} lang={ar?'en':'ar'} aria-label={ar?'Switch to English':'التبديل إلى العربية'}>{ar?'EN':'عربي'}</Link>
      <button ref={toggleRef} className="menu-toggle" aria-expanded={open} aria-controls={open?'mobile-menu':undefined} onClick={()=>setOpen(!open)}>{open ? (ar?'إغلاق':'Close') : (ar?'القائمة':'Menu')}<span aria-hidden className={open?'menu-icon open':'menu-icon'}><i/><i/></span></button>
    </div>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label={ar?'القائمة':'Menu'}>
      {(['work','about','contact'] as const).map((item,i)=><Link key={item} href={`/${locale}/${item}`}>{(ar?['الأعمال','عنّي','تواصل']:['Work','About','Contact'])[i]}</Link>)}
      <Link className="mobile-beyond" href={`/${locale}/beyond`}>{ar?'خارج إطار المشاريع':'Beyond Projects'}</Link>
      <span>Jeddah, Saudi Arabia</span>
    </nav>}
  </header>;
}
