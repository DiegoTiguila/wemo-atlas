import {notFound} from 'next/navigation';
import Link from 'next/link';
import {chapterNumber,chapters} from '@/data/content';
import {Section} from '@/components/Sections';
export function generateStaticParams(){return chapters.map(c=>({slug:c.slug}))}
export default async function Chapter({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const i=chapters.findIndex(c=>c.slug===slug);if(i<0)notFound();const next=chapters[(i+1)%chapters.length];return <><div className="chapter-hero"><Link data-route href="/" className="mono">← VOLVER AL ATLAS</Link><span className="eyebrow" data-hero>CAPÍTULO / {chapterNumber(i)}</span><h1 data-hero>{chapters[i].title}<span>↗</span></h1><p data-hero>[Descripción de sección]</p></div><Section index={i} detail/><div className="next-chapter"><span className="mono">SIGUIENTE CAPÍTULO</span><Link data-route href={'/capitulo/'+next.slug+'/'}>{next.title} ↗</Link></div></>}
