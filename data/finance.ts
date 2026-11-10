import workbook from './workbook.json';

export const formatMXN = (value:number) =>
 new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',minimumFractionDigits:Number.isInteger(value)?0:2}).format(value);

export const investmentTotal=workbook.assets.reduce((total,asset)=>total+asset.value,0);
export const investmentSeries=Object.entries(workbook.assets.reduce<Record<string,number>>((totals,asset)=>{
 totals[asset.kind]=(totals[asset.kind]??0)+asset.value;
 return totals;
},{})).map(([name,value])=>({name,value}));
