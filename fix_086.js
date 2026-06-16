const fs=require('fs');
const data=JSON.parse(fs.readFileSync('data/sira.min.json','utf8'));
data.rdv[85].paragraphes[5].content.fr=data.rdv[85].paragraphes[5].content.fr.replace(
  'Puis il dit oui — il s\'inclina devant la volonté de la majorité.',
  'Puis il décida de sortir — tenant compte de l\'élan de ses compagnons.'
);
fs.writeFileSync('data/sira.min.json',JSON.stringify(data),'utf8');
console.log('OK:',data.rdv[85].paragraphes[5].content.fr);
