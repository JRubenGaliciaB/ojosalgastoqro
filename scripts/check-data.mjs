import assert from 'node:assert/strict';import fs from 'node:fs';
const d=JSON.parse(fs.readFileSync('public/data/budget.json'));
assert.equal(d.years.length,6);assert.equal(d.distribution.filter(r=>!r.isTotal).length,9);
for(const y of d.years){assert.equal(d.distribution.filter(r=>!r.isTotal).reduce((s,r)=>s+(r.values[y]??0),0),d.distribution.find(r=>r.isTotal).values[y]);assert.equal(d.distribution.find(r=>r.name.startsWith('Dependencias')).values[y],d.dependencies.find(r=>r.group==='TOTAL GENERAL').values[y]);}
assert.equal(d.dependencies.find(r=>r.name==='Secretaría de las Mujeres').values[2024],null);
assert(d.audit.length>0);console.log('Passed: annual totals, central totals, missing values, reconciliation audit.');
