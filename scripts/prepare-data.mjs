import XLSX from 'xlsx';
import fs from 'node:fs';
const years=[2021,2022,2023,2024,2025,2026];
function read(file){const w=XLSX.readFile(`public/data/${file}.xlsx`);return XLSX.utils.sheet_to_json(w.Sheets[w.SheetNames[0]],{header:1,defval:null});}
function values(row,header){return Object.fromEntries(years.map(y=>{const v=row[header.indexOf(y)];if(v===null||v==='-'||v==='')return [y,null];if(typeof v!=='number'||!Number.isFinite(v)||v<0)throw Error(`Invalid amount ${v}`);return [y,v];}));}
const [dh,...dr]=read('distribucion');const distribution=dr.filter(r=>r[0]).map((r,i)=>({id:`r${i}`,name:r[0],values:values(r,dh),isTotal:r[0].startsWith('TOTAL')}));
const [h,...rows]=read('dependencias');let group='GUBERNATURA';const dependencies=rows.filter(r=>r[1]).map((r,i)=>{const total=r[1].startsWith('TOTAL');if(total&&r[0]!=='TOTAL GENERAL')group=r[0];return {id:`d${i}`,name:r[1],type:r[0],group:r[0]==='TOTAL GENERAL'?'TOTAL GENERAL':group,values:values(r,h),isTotal:total};});
const audit=[];for(const sector of dependencies.filter(r=>r.isTotal&&r.group!=='TOTAL GENERAL'))for(const y of years){const detail=dependencies.filter(r=>!r.isTotal&&r.group===sector.group);const sum=detail.reduce((s,r)=>s+(r.values[y]??0),0);if(sector.values[y]!==null&&sum!==sector.values[y])audit.push({group:sector.group,year:y,reported:sector.values[y],detail:sum,difference:sum-sector.values[y]});}
for(const y of years){const sum=distribution.filter(r=>!r.isTotal).reduce((s,r)=>s+(r.values[y]??0),0);if(sum!==distribution.find(r=>r.isTotal).values[y])throw Error('Distribution mismatch '+y);}
fs.writeFileSync('public/data/budget.json',JSON.stringify({years,distribution,dependencies,audit}));console.log(`Validated ${distribution.length-1} categories, ${dependencies.filter(r=>!r.isTotal).length} dependencies; ${audit.length} reconciliation differences.`);
