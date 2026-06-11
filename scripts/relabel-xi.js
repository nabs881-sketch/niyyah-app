const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
let n = 0;
d.rdv.forEach(r => { if (r.partie === 'XI') { r.partie = 'Anecdotes datées'; n++; } });
if (d.meta && d.meta.parties && d.meta.parties['XI']) delete d.meta.parties['XI'];
fs.writeFileSync(p, JSON.stringify(d));
console.log('Relabel XI -> Anecdotes datées :', n, '(attendu : 11)');
