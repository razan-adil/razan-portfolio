import Image from 'next/image';
import { projectEvidence } from '@/lib/evidence';
import type { Locale } from '@/lib/content';

export default function CaseEvidence({ slug, locale }: { slug: string; locale: Locale }) {
  const evidence = projectEvidence[slug];
  if (!evidence?.length) return null;
  const ar = locale === 'ar';

  return <section className="case-evidence" aria-labelledby="evidence-title">
    <p className="eyebrow">{ar ? 'من المشروع نفسه' : 'FROM THE ACTUAL PROJECT'}</p>
    <h2 id="evidence-title">{ar ? 'العمل، كما هو.' : 'The work, in evidence.'}</h2>
    {evidence.map(item => <figure className="evidence-item" key={item.sourceUrl} data-scroll-reveal>
      <h3>{item.title[locale]}</h3>
      {item.kind === 'image' ? <a className="evidence-image-link" href={item.src} target="_blank" rel="noopener noreferrer" aria-label={`${ar ? 'افتح الصورة الكاملة:' : 'Open full image:'} ${item.title[locale]}`}>
        <Image src={item.src} alt={item.alt[locale]} width={item.width} height={item.height} sizes="(min-width: 1024px) 60vw, 100vw" />
      </a> : <pre className="evidence-code" tabIndex={0} dir="ltr" lang="en" aria-label={ar ? 'مقتطف Python من مستودع المشروع العام' : 'Python excerpt from the public project repository'}><code>{item.code}</code></pre>}
      <figcaption>
        <p>{item.caption[locale]}</p>
        <div className="evidence-source-links">
          <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">{item.sourceLabel[locale]}</a>
          {item.kind === 'code' && <a href={item.attributionUrl} target="_blank" rel="noopener noreferrer">{ar ? 'توثيق مساهمتي' : 'Contribution attribution'}</a>}
        </div>
      </figcaption>
    </figure>)}
  </section>;
}
