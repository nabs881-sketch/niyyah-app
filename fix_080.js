const fs=require('fs');
const data=JSON.parse(fs.readFileSync('data/sira.min.json','utf8'));
data.rdv[79].paragraphes[7].content.fr='Les autres juifs de Médine se turent. Une voix qui appelle à la mort des autres est elle-même une arme — et les armes ont des conséquences.';
fs.writeFileSync('data/sira.min.json',JSON.stringify(data),'utf8');
console.log('OK:',data.rdv[79].paragraphes[7].content.fr);
