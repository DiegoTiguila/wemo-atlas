'use client';

import {createContext,useContext,useState,type ReactNode} from 'react';
import {businesses} from '@/data/content';

type Filter = {
 selected:number|null;
 toggle:(index:number)=>void;
 clear:()=>void;
};

const BusinessFilter = createContext<Filter|null>(null);

export function BusinessFilterProvider({children}:{children:ReactNode}) {
 const [selected,setSelected]=useState<number|null>(null);
 return <BusinessFilter.Provider value={{
  selected,
  toggle:index=>setSelected(current=>current===index?null:index),
  clear:()=>setSelected(null),
 }}>{children}</BusinessFilter.Provider>;
}

export function useBusinessFilter() {
 const filter=useContext(BusinessFilter);
 if(!filter)throw new Error('Falta el contexto de líneas de negocio.');
 return filter;
}

export function FilterScope({status=false}:{status?:boolean}) {
 const {selected,clear}=useBusinessFilter();
 return <div className="filter-scope">
  <span role={status?'status':undefined}><span className="status-dot"/> {selected===null?'Todas las líneas de negocio':businesses[selected]}</span>
  {selected!==null&&<button className="pill" type="button" onClick={clear}>Ver todas <span aria-hidden="true">×</span></button>}
 </div>;
}
