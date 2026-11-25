import {beyond,type Locale} from '@/lib/content';
export default function Beyond({locale,standalone=false}:{locale:Locale;standalone?:boolean}){
 const ar=locale==='ar';
 const Heading=standalone?'h1':'h2';
 return <section className="beyond-section section-padding" aria-labelledby="beyond-title"><div className="beyond-heading" data-scroll-reveal><p className="eyebrow">{ar?'فضول يتجاوز إطار المشروع':'SIDE PATHS. SHARED CURIOSITIES.'}</p><Heading id="beyond-title">{ar?'خارج إطار':'Beyond'}<br/><span className="serif">{ar?'المشاريع.':'projects.'}</span></Heading><p>{ar?'تجارب جماعية ومشاركات ومقترحات تفتح مسارات جديدة للتعلّم.':'Team experiences, explorations and proposals that keep the learning moving.'}</p></div><div className="beyond-list">{beyond.map((item,i)=><article key={item.title.en} className="beyond-item" data-scroll-reveal><div className={`beyond-symbol symbol-${i}`} aria-hidden>{i===0?'✳':i===1?'⌑':'⌁'}</div><div><p className="eyebrow">{item.type[locale]}</p><h3>{item.title[locale]}</h3><p>{item.description[locale]}</p></div></article>)}</div></section>;
}
