'use client';

import {useState} from 'react';
import Chart,{formatShare,pieColor} from './Chart';
import {FilterScope,useBusinessFilter} from './BusinessFilter';
import workbook from '@/data/workbook.json';
import {businesses} from '@/data/content';
import {formatMXN,investmentSeries} from '@/data/finance';

export function DirectCosts(){
 const {selected}=useBusinessFilter();
 const lines=businesses.map((name,index)=>({name,index})).filter(line=>selected===null||line.index===selected);
 return <div className="operation-data"><FilterScope/>
  <p className="operation-summary">Costo del consumo indicado en la hoja. Se muestran por separado las líneas y los conceptos con unidades pendientes de confirmar.</p>
  <div className="workbook-grid">{lines.map(line=><section className="chart-panel" key={line.name}>
   <h3>{line.name}</h3>
   <ul className="operation-bar-list">{workbook.direct.filter(row=>row.business===line.index).map(row=><li key={row.source}>
    <div className="operation-bar-label"><span>{row.name}</span><strong>{row.value===null?'Pendiente':formatMXN(row.value)}</strong></div>
    <div className="operation-bar-meta mono">
     {row.quantity!==null&&<span>Consumo: {row.quantity} {row.usage}</span>}
     {row.price!==null&&<span>Compra: {formatMXN(row.price)} / {row.pack} {row.purchase}</span>}
    </div>
    {row.note&&<p className="data-note">{row.note}</p>}
   </li>)}</ul>
  </section>)}</div>
 </div>;
}

export function Equipment(){
 return <div className="chart-panel">
  <h3>Adquisiciones preoperativas</h3>
  <ul className="operation-bar-list">{workbook.assets.map(item=><li key={item.name}>
   <div className="operation-bar-label"><span>{item.name}</span><strong>{formatMXN(item.value)}</strong></div>
   <div className="operation-bar-meta mono"><span>{item.kind} · {item.quantity} unidades</span><span>{item.depreciation==='No'?'Sin depreciación':`Depreciación: ${item.depreciation.split(', ')[1]}`}</span>
    {'unitPrice' in item&&item.unitPrice!==undefined&&<span>{formatMXN(item.unitPrice)} por unidad</span>}
    {'lines' in item&&item.lines&&<span>{item.lines.map(i=>businesses[i]).join(' / ')}</span>}
   </div>
  </li>)}</ul>
 </div>;
}

function PieBreakdown({rows,caption,summary,periods}:{rows:{name:string;value:number}[];caption:string;summary:string;periods?:number[][]}){
 const total=rows.reduce((sum,row)=>sum+row.value,0);
 return <div className="split pie-breakdown">
  <div className="chart-panel"><span className="mono">{caption}</span><Chart kind="pie" data={rows} format="mxn"/></div>
  <div className="ledger"><div className="big-value">{formatMXN(total)}<small>{summary}</small></div>
   <ul className="pie-legend" aria-label="Guía de colores">
    {rows.map((row,i)=><li className="ledger-row" key={row.name}>
     <i style={{backgroundColor:pieColor(i)}} aria-hidden="true"/>
     <div>{row.name}{periods?.[i]&&<small>Meses {periods[i].join('–')}</small>}</div>
     <span>{formatMXN(row.value)} · {total?formatShare(row.value/total):'0%'}</span>
    </li>)}
   </ul>
  </div>
 </div>;
}

export function Investment(){
 return <PieBreakdown rows={investmentSeries} caption="EQUIPAMIENTO / MXN" summary="Inversión preoperativa en equipamiento"/>;
}

export function Administration(){
 const {selected}=useBusinessFilter();
 const [year,setYear]=useState(0);
 const share=selected===null?1:workbook.adminShares[year][selected]/100;
 const rows=workbook.admin.map(row=>({name:row.name,value:row.mxn*share}));
 return <div className="operation-data">
  <FilterScope/>
  <h3>Gastos recurrentes</h3>
  {selected!==null&&<div className="tabs" aria-label="Año de asignación de gastos">{[0,1].map(i=><button className={year===i?'active':''} key={i} type="button" aria-pressed={year===i} onClick={()=>setYear(i)}>Año {i+1}</button>)}</div>}
  <PieBreakdown rows={rows} caption="GASTOS RECURRENTES / MXN AL MES" summary={selected===null?'Total mensual de gastos recurrentes':`Total mensual asignado · Año ${year+1}`} periods={workbook.admin.map(row=>row.period)}/>
   <section className="chart-panel"><h3>Nómina administrativa y comercial</h3>
    <p className="data-note">MXN al mes · La hoja no asigna estos sueldos por línea de negocio.</p>
    <ul className="operation-bar-list">{workbook.payroll.map(row=><li key={row.name}>
     <div className="operation-bar-label"><span>{row.name}</span><strong>{formatMXN(row.mxn)}</strong></div>
     <div className="operation-bar-meta mono"><span>{row.kind}</span><span>Meses {row.period[0]}–{row.period[1]}</span></div>
    </li>)}</ul>
   </section>
 </div>;
}

export function SalesProjection(){
 return <p className="operation-summary">Ingresos pendientes de definir.</p>;
}

export function ExpenseProjection(){
 return <div className="operation-data">
  <div className="projection-top"><span className="mono">HORIZONTE / 24 MESES</span></div>
  <Chart kind="line" months/>
  <div className="metrics">{['Ingresos proyectados','Flujo de caja','Punto de equilibrio'].map(label=><div key={label}><span>{label}</span><strong aria-label="Pendiente">—</strong></div>)}</div>
 </div>;
}

export function UnitEconomics(){
 return <div className="operation-data"><h3>Indicadores unitarios</h3>
  <div className="metrics">{['Costo de adquisición (CAC)','Valor de vida del cliente (LTV)','Relación LTV / CAC'].map(label=><div key={label}><span>{label}</span><strong aria-label="Pendiente">—</strong></div>)}</div>
 </div>;
}
