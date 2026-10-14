export type Year=2021|2022|2023|2024|2025|2026;
export interface BudgetRow {id:string;name:string;type?:string;group?:string;isTotal:boolean;values:Record<Year,number|null>}
export interface BudgetData {years:Year[];distribution:BudgetRow[];dependencies:BudgetRow[];audit:{group:string;year:Year;reported:number;detail:number;difference:number}[]}
export async function loadData():Promise<BudgetData>{const r=await fetch('/data/budget.json');if(!r.ok)throw Error('No fue posible cargar los datos');return r.json();}
export function variation(a:number|null,b:number|null){return {absolute:a===null||b===null?null:b-a,percent:a===null||b===null||a===0?null:(b-a)/a*100};}
export function historical(row:BudgetRow,years:Year[]){return years.map(year=>({year,amount:row.values[year]}));}
export function aggregate(rows:BudgetRow[],year:Year){const values=rows.map(r=>r.values[year]);return values.every(v=>v===null)?null:values.reduce<number>((s,v)=>s+(v??0),0);}
