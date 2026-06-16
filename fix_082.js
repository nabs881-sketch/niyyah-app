const fs=require('fs');
const data=JSON.parse(fs.readFileSync('data/sira.min.json','utf8'));
const r=data.rdv[81];
console.log('id:',r.id);
console.log('para[0]:',r.paragraphes[0].content.fr);
console.log('para[1]:',r.paragraphes[1].content.fr);
console.log('source.fr:',r.source.fr);

r.paragraphes[0].content.fr=r.paragraphes[0].content.fr.replace('Tout commença dans un bistrot.','Tout commença dans un lieu de beuverie.');
r.paragraphes[1].content.fr=r.paragraphes[1].content.fr.replace('Il se trouvait dans un bistrot avec Nuʿaym ibn Masʿūd','Il se trouvait à boire avec Nuʿaym ibn Masʿûd');
r.source.fr='Al-Wâqidî (Maghâzî) — Ibn Hishâm (expédition de Qirada)';

fs.writeFileSync('data/sira.min.json',JSON.stringify(data),'utf8');
console.log('---AFTER---');
console.log('para[0]:',r.paragraphes[0].content.fr);
console.log('para[1]:',r.paragraphes[1].content.fr);
console.log('source.fr:',r.source.fr);
