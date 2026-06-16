const fs=require('fs');
const data=JSON.parse(fs.readFileSync('data/sira.min.json','utf8'));
const r=data.rdv[88];

r.paragraphes[2].content.fr=r.paragraphes[2].content.fr.replace(
  'ʿAbdullāh ibn ʿUmar, treize ans.',
  'ʿAbdullāh ibn ʿUmar, quatorze ans.'
);

r.paragraphes[6].content.fr=r.paragraphes[6].content.fr.replace(
  'Celui qui avait abattu ʿUtba et al-Walīd au début de Badr.',
  'Celui qui avait abattu ʿUtba ibn Rabîʿa au début de Badr.'
);

fs.writeFileSync('data/sira.min.json',JSON.stringify(data),'utf8');
console.log('para[2]:',r.paragraphes[2].content.fr);
console.log('para[6]:',r.paragraphes[6].content.fr);
