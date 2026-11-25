import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Beyond from '@/components/Beyond';
import Footer from '@/components/Footer';
import type {Locale} from '@/lib/content';
export const metadata:Metadata={title:'Beyond Projects'};
export default async function BeyondPage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(locale!=='en'&&locale!=='ar')notFound();return <main id="main" className="beyond-page"><div className="section-padding"><p className="eyebrow">{locale==='ar'?'مساحة للاستكشاف والمشاركة':'A SPACE FOR EXPLORATION & COLLABORATION'}</p></div><Beyond locale={locale as Locale} standalone/><Footer locale={locale as Locale}/></main>;}
