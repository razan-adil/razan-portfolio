'use client';
import {useEffect, useRef} from 'react';
import {usePathname} from 'next/navigation';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import type {Locale} from '@/lib/content';

gsap.registerPlugin(ScrollTrigger);
export default function Motion({children,locale}: {children:React.ReactNode;locale:Locale}) {
  const ref=useRef<HTMLDivElement>(null);
  const path=usePathname();
  useEffect(()=> {
    document.documentElement.lang=locale;
    document.documentElement.dir=locale==='ar'?'rtl':'ltr';
    const mm=gsap.matchMedia();
    let lenis:Lenis|undefined;
    let tick:((time:number)=>void)|undefined;
    mm.add('(prefers-reduced-motion: no-preference)',()=> {
      const ctx=gsap.context(()=> {
        gsap.fromTo('[data-reveal]',{y:32,opacity:0},{y:0,opacity:1,duration:.9,stagger:.09,ease:'power3.out',clearProps:'transform,opacity'});
        gsap.utils.toArray<HTMLElement>('[data-scroll-reveal]').forEach(el=> {
          gsap.fromTo(el,{y:45,opacity:0},{y:0,opacity:1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 91%',once:true},clearProps:'transform,opacity'});
        });
        if(document.querySelector('.hero-art')) gsap.to('.hero-art',{yPercent:14,scale:1.07,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
      },ref);
      // Native scrolling on touch retains expected swipe and accessibility behavior.
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        lenis=new Lenis({duration:1.05,smoothWheel:true,anchors:true});
        lenis.on('scroll',ScrollTrigger.update);
        tick=(time:number)=>lenis?.raf(time*1000);
        gsap.ticker.add(tick);
      }
      return ()=> {ctx.revert(); if(tick)gsap.ticker.remove(tick); lenis?.destroy();};
    });
    const frame=requestAnimationFrame(()=>ScrollTrigger.refresh());
    return ()=> {cancelAnimationFrame(frame);mm.revert();};
  },[path,locale]);
  return <div ref={ref} className="page-content" key={path}>{children}</div>;
}
