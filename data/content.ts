export const chapters = [
 {slug:'modelo',title:'Modelo de negocio',tag:'Las cuatro líneas de negocio del estudio.'},
 {slug:'costos',title:'Costos directos',tag:'Recursos atribuibles a cada proyecto o servicio.'},
 {slug:'mano-de-obra',title:'Mano de obra operativa',tag:'Roles y dedicación del equipo de producción.'},
 {slug:'costos-indirectos',title:'Costos indirectos',tag:'Recursos compartidos entre las líneas de negocio.'},
 {slug:'gastos-administrativos',title:'Gastos administrativos',tag:'Gastos de gestión y soporte del estudio.'},
 {slug:'infraestructura',title:'Maquinaria, mobiliario y equipo',tag:'Capacidad instalada y recursos del estudio.'},
 {slug:'estrategias-comerciales',title:'Estrategias comerciales',tag:'Acciones comerciales por línea de negocio.'},
 {slug:'inversion',title:'Inversión inicial',tag:'El punto de partida'},
 {slug:'ingresos',title:'Modelo de ingresos',tag:'Cuatro formas de crear valor'},
 {slug:'proyeccion',title:'Proyección financiera',tag:'Una mirada a 24 meses'},
 {slug:'conclusiones',title:'Conclusiones',tag:'El siguiente capítulo'},
] as const;
export const chapterNumber = (index:number) => String(index+1).padStart(2,'0');
export const businesses=['Cine & VFX','Comercial & digital','Coworking creativo','Residencias creativas'];
export type Datum={name:string;value:number|null;expenses?:number|null;cash?:number|null};
