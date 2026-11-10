import workbook from './workbook.json';

// Los porcentajes siguen el orden de businesses en content.ts:
// Cine y VFX, comercial, coworking, residencias.
export type CostUnit = 'month' | 'project' | 'hour';
export type CostRow = {
 name:string;
 mxn:number;
 unit:CostUnit;
 shares:readonly [number,number,number,number];
 period?:readonly [number,number];
 schedule?:readonly [number,number];
};

function parseRows(rows:readonly {name:string;mxn:number;unit:string;shares:number[];period?:number[];schedule?:number[]}[]): CostRow[] {
 return rows.map(row=>({
  name:row.name,mxn:row.mxn,unit:row.unit as CostUnit,
  shares:[row.shares[0],row.shares[1],row.shares[2],row.shares[3]],
  ...(row.period?{period:[row.period[0],row.period[1]] as const}:{}),
  ...(row.schedule?{schedule:[row.schedule[0],row.schedule[1]] as const}:{}),
 }));
}
export const indirectCosts=parseRows(workbook.indirect);
export const laborCosts=parseRows(workbook.labor);

export function allocatedCents(row:CostRow,business:number|null) {
 return Math.round(row.mxn * (business === null ? 100 : row.shares[business]));
}
