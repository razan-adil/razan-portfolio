import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import {notFound} from 'next/navigation';
import type {Locale} from '@/lib/content';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'Selected Work'};
export default async function Work({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(locale!=='en'&&locale!=='ar')notFound();return <main id="main"><Gallery locale={locale as Locale} standalone/><Footer locale={locale as Locale} compact/></main>;}
