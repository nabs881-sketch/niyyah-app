const fs=require('fs');
const data=JSON.parse(fs.readFileSync('data/sira.min.json','utf8'));
const r=data.rdv[83];
console.log('id:',r.id);
console.log('para[1]:',r.paragraphes[1].content.fr);
console.log('source.fr:',r.source.fr);

r.paragraphes[1].content.fr=r.paragraphes[1].content.fr.replace(
  'Il lui souffla doucement l\'adhān à l\'oreille droite. Puis l\'iqāma à l\'oreille gauche.',
  'Il lui souffla doucement l\'adhān à l\'oreille droite.'
);
r.source.fr='Sunan Abî Dâwûd / Tirmidhî (adhân à l\'oreille droite) — Sahih Bukhari (enfants sur le dos en prière, khuṭba interrompue)';

fs.writeFileSync('data/sira.min.json',JSON.stringify(data),'utf8');
console.log('---AFTER---');
console.log('para[1]:',r.paragraphes[1].content.fr);
console.log('source.fr:',r.source.fr);
