'use client';

import {allocatedCents,indirectCosts,laborCosts,type CostRow,type CostUnit} from '@/data/operations';
import {FilterScope,useBusinessFilter} from './BusinessFilter';

const money = new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',minimumFractionDigits:0,maximumFractionDigits:2});
const units = {month:'mes',project:'proyecto',hour:'hora'} as const;
const paymentGroups = [
 ['month','Pago mensual'],
 ['project','Pago por proyecto'],
 ['hour','Pago por hora'],
] as const;

function CostBars({rows,unit,title}:{rows:readonly CostRow[];unit:CostUnit;title:string}) {
 const {selected}=useBusinessFilter();
 const entries=rows.map(row=>({row,cents:allocatedCents(row,selected)})).filter(entry=>entry.cents>0);
 const max=Math.max(1,...rows.map(row=>allocatedCents(row,null)));
 const total=entries.reduce((sum,entry)=>sum+entry.cents,0);
 return <section className="operation-bars chart-panel" aria-label={title}>
  <div className="operation-bars-heading">
   <h4>{title}</h4>
   <span className="mono">MXN / {units[unit]}</span>
  </div>
  {unit==='month'&&<p className="operation-total"><strong>{money.format(total/100)}</strong> <span>MXN al mes</span></p>}
  {entries.length===0?<p className="operation-summary">Sin conceptos asignados a esta línea.</p>:
   <ul className="operation-bar-list">
    {entries.map(({row,cents})=><li key={row.name}>
     <div className="operation-bar-label">
      <span>{row.name}</span><strong>{money.format(cents/100)}</strong>
     </div>
     <div className="operation-bar-track" aria-hidden="true"><div style={{width:`${cents/max*100}%`}}/></div>
     <div className="operation-bar-meta mono">
      {selected!==null&&<span>{row.shares[selected]}% de {money.format(row.mxn)}</span>}
      {row.period&&<span>Meses {row.period[0]}–{row.period[1]}</span>}
      {row.schedule&&<span>{row.schedule[0]} días/sem · {row.schedule[1]} h/día</span>}
     </div>
    </li>)}
   </ul>}
 </section>;
}

export default function OperationCharts({kind,heading=false}:{kind:'indirect'|'labor';heading?:boolean}) {
 return <div className="operation-data">
  {heading&&<h3>{kind==='indirect'?'Costos indirectos':'Mano de obra operativa'}</h3>}
  <FilterScope/>
  {kind==='indirect'?
   <CostBars rows={indirectCosts} unit="month" title="Costo mensual por concepto"/>:
   <div className="operation-groups">
    {paymentGroups.map(([unit,title])=><CostBars key={unit} rows={laborCosts.filter(row=>row.unit===unit)} unit={unit} title={title}/>)}
   </div>}
 </div>;
}
