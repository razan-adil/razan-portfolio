import type { MetadataRoute } from 'next';
import {projects} from '@/lib/content';
import {siteUrl} from '@/lib/metadata';
export default function sitemap():MetadataRoute.Sitemap {
 const paths=['','/work','/about','/beyond','/contact',...projects.map(p=>`/work/${p.slug}`)];
 return paths.flatMap(path=>['en','ar'].map(locale=>({url:`${siteUrl}/${locale}${path}`,alternates:{languages:{en:`${siteUrl}/en${path}`,ar:`${siteUrl}/ar${path}`}},changeFrequency:'monthly' as const,priority:path===''?1:path==='/work'?.9:.7})));
}
