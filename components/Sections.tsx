'use client';
import Link from 'next/link';
import {Administration,DirectCosts,Equipment,ExpenseProjection,Investment,SalesProjection,UnitEconomics} from './WorkbookPanels';
import workbook from '@/data/workbook.json';
import OperationCharts from './OperationCharts';
import {FilterScope,useBusinessFilter} from './BusinessFilter';
import {businesses,chapterNumber,chapters} from '@/data/content';
function Label({n,children}:{n:string;children:React.ReactNode}){return <div className="eyebrow"><span>/{n}</span>{children}<span>↘</span></div>}
export function Section({index,detail=false}:{index:number;detail?:boolean}){
 const {selected,toggle}=useBusinessFilter();const c=chapters[index];
 return <section id={c.slug} className={'section section-'+index} data-reveal><Label n={chapterNumber(index)}>{c.title}</Label><div className="section-heading"><h2>{c.title}<span>↗</span></h2>{!detail&&<Link className="pill" data-route href={'/capitulo/'+c.slug+'/'}>Explorar capítulo <span>↗</span></Link>}</div>
 {c.slug==='modelo'&&<><div className="business-grid">{businesses.map((name,i)=><button className={'business '+(selected===i?'selected':'')} key={name} type="button" onClick={()=>toggle(i)} aria-pressed={selected===i}><span className="mono">0{i+1} / UNIDAD</span><div className={'abstract shape-'+i} aria-hidden="true">{['✳','◉','▦','✺'][i]}</div><h3>{name}</h3><span className="business-bottom">{selected===i?'Quitar filtro':'Filtrar gráficas'} <b aria-hidden="true">{selected===i?'−':'+'}</b></span></button>)}</div><div className="business-filter-info"><FilterScope status/><p>Selecciona una línea para filtrar los costos, la mano de obra y los gastos asignados. Pulsa de nuevo para ver todas.</p>{selected!==null&&<div className="business-description"><h3>{workbook.businesses[selected].name}</h3><p>{workbook.businesses[selected].sale} · Servicio</p><p>{workbook.businesses[selected].description??'Descripción pendiente en la hoja.'}</p></div>}</div>{detail&&<div className="operation-preview"><OperationCharts kind="labor" heading/><OperationCharts kind="indirect" heading/></div>}</>}
 {c.slug==='infraestructura'&&<Equipment/>}
 {c.slug==='inversion'&&<Investment/>}
 {c.slug==='mano-de-obra'&&<OperationCharts kind="labor"/>}
 {c.slug==='costos-indirectos'&&<OperationCharts kind="indirect"/>}
 {c.slug==='costos'&&<DirectCosts/>}
 {c.slug==='gastos-administrativos'&&<Administration/>}
 {c.slug==='estrategias-comerciales'&&<p className="operation-summary">La hoja todavía no define los canales de venta, cobro o distribución.</p>}
 {c.slug==='ingresos'&&<SalesProjection/>}
 {c.slug==='proyeccion'&&<ExpenseProjection/>}
 {c.slug==='conclusiones'&&<UnitEconomics/>}
 </section>
}
export default function Sections(){return <>{chapters.map((c,i)=><Section index={i} key={c.slug}/>)}</>}