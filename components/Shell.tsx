'use client';
import Link from 'next/link';
import {usePathname,useRouter} from 'next/navigation';
import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {chapterNumber,chapters} from '@/data/content';
import project from '@/data/project.json';
import {BusinessFilterProvider} from './BusinessFilter';
gsap.registerPlugin(ScrollTrigger);
export default function Shell({children}:{children:React.ReactNode}){
 const path=usePathname(),router=useRouter(),root=useRef<HTMLDivElement>(null),veil=useRef<HTMLDivElement>(null),busy=useRef(false);const [menu,setMenu]=useState(false);
 useEffect(()=>{setMenu(false);busy.current=false;const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{gsap.to(veil.current,{scaleY:0,transformOrigin:'top',duration:.65,overwrite:true,ease:'power3.inOut'});const ctx=gsap.context(()=>{gsap.from('[data-hero]',{y:65,opacity:0,duration:1,stagger:.12,ease:'power3.out'});gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>gsap.from(el,{y:36,opacity:0,duration:.8,scrollTrigger:{trigger:el,start:'top 92%',once:true}}));},root);return ()=>ctx.revert()});return ()=>mm.revert()},[path]);
 useEffect(()=>{
  const el=root.current;
  const artLogo=el?.querySelector('.art-wordmark');
  if(!el||!artLogo)return;
  const mm=gsap.matchMedia();
  mm.add({animate:'(prefers-reduced-motion: no-preference)',reduce:'(prefers-reduced-motion: reduce)'},({conditions})=>{
   const topLogos=el.querySelectorAll('[data-top-brand]');
   const swap=gsap.timeline({paused:true})
    .to(topLogos,{opacity:0,duration:.18,ease:'power2.in'})
    .fromTo(artLogo,{opacity:0},{opacity:1,duration:.25,ease:'power2.out',immediateRender:true});
   const trigger=ScrollTrigger.create({
    trigger:artLogo,
    start:'top 95%',
    end:()=>`bottom ${el.querySelector('header')?.offsetHeight ?? 0}px`,
    onToggle:({isActive})=>{
     if(!conditions?.animate)swap.progress(isActive?1:0).pause();
     else if(isActive)swap.play();
     else swap.reverse();
    },
    onRefresh:({isActive})=>swap.progress(isActive?1:0).pause()
   });
   swap.progress(trigger.isActive?1:0).pause();
  });
  return ()=>mm.revert();
 },[path]);
 function navigate(e:React.MouseEvent<HTMLDivElement>,href:string){if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;e.preventDefault();if(href.replace(/\/$/,'')===path.replace(/\/$/,'')){setMenu(false);return}if(busy.current)return;setMenu(false);if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){router.push(href);return}busy.current=true;gsap.set(veil.current,{transformOrigin:'bottom'});gsap.to(veil.current,{scaleY:1,duration:.45,overwrite:true,ease:'power3.inOut',onComplete:()=>router.push(href)});}
 useEffect(()=>{const el=root.current;if(!el)return;const hover=(e:PointerEvent)=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const target=(e.target as HTMLElement).closest('button, .pill, .business');if(target)gsap.to(target,{y:e.type==='pointerover'?-3:0,duration:.25,overwrite:'auto'})};el.addEventListener('pointerover',hover);el.addEventListener('pointerout',hover);return()=>{el.removeEventListener('pointerover',hover);el.removeEventListener('pointerout',hover)}},[]);
 return <div ref={root} onClickCapture={e=>{const a=(e.target as HTMLElement).closest('a[data-route]') as HTMLAnchorElement|null;if(a){
  const href=a.getAttribute('href');
  const base=process.env.NEXT_PUBLIC_BASE_PATH||'';
  if(href)navigate(e,base&&href.startsWith(base+'/')?href.slice(base.length):href);
 }}}>
 <a className="skip" href="#main">Ir al contenido</a><header><Link data-route data-top-brand href="/" className="wordmark">[{project.name}]<span>®</span></Link><span className="header-note">ATLAS FINANCIERO<br/>ESTUDIO DE VFX CREATIVO / MÉXICO</span><button className="menu-button" aria-expanded={menu} aria-controls="index" onClick={()=>setMenu(!menu)}>{menu?'Cerrar −':'Índice +'}</button></header>
 {menu&&<nav id="index" className="index"><Link data-route href="/">00 / Inicio</Link>{chapters.map((c,i)=><Link data-route href={'/capitulo/'+c.slug+'/'} key={c.slug}><small>{chapterNumber(i)}</small>{c.title}<span>↗</span></Link>)}</nav>}
 <main id="main" tabIndex={-1}><BusinessFilterProvider>{children}</BusinessFilterProvider></main><footer><Link data-route href="/" className="wordmark">[{project.name}]<span>®</span></Link><span>MODELO FINANCIERO / TEMPLATE</span><a href="#main">Volver arriba ↑</a></footer><div ref={veil} className="veil" aria-hidden="true"/></div>
}
