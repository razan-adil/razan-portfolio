'use client';
import {useState,useEffect,useRef} from 'react';
import type {Locale} from '@/lib/content';
export default function CopyEmail({email,locale}:{email:string;locale:Locale}){
 const [state,setState]=useState<'idle'|'copied'|'failed'>('idle');const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 async function copy(){try{await navigator.clipboard.writeText(email);setState('copied');}catch{setState('failed');}if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>setState('idle'),3500);}
 const labels=locale==='ar'?{idle:'انسخ البريد',copied:'تم النسخ',failed:'تعذّر النسخ؛ استخدم رابط البريد'}:{idle:'Copy email',copied:'Copied',failed:'Copy unavailable — use the email link'};
 return <button className="copy-email" onClick={copy}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden><rect x="7" y="7" width="10" height="10" rx="1"/><path d="M13 7V3H3v10h4"/></svg><span aria-live="polite">{labels[state]}</span></button>;
}
