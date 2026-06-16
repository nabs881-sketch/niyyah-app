# SPEC-INTENTION-ZELLIGE (cartes intention — zellige ivoire lisible + overlay remonté)

## Ce que ça fait
- Cartes d'intention en **ivoire parchemin** avec motif **zellige** (étoiles à 8 branches) gravé, filet doré.
- Encre **sombre** au repos ET en sélection → lisible en toute circonstance (jamais de texte doré sur ivoire).
- Carte **vendredi / jour béni** plus chaude + label en capitales dorées sombres.
- **Overlay remonté** : le panneau « Ancrer votre Niyyah » monte plus haut, boutons calés en bas → fini le vide.

## Cible
`style.css` uniquement. CSS pur (motif en SVG encodé, pas de JS). ⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Remplacement (le bloc intention actuel → version zellige ivoire)
CHERCHER :
```
/* ===== Cartes d'intention (Ancrer votre Niyyah) — identité ambre ===== */
.intention-opt-v2{
  background:linear-gradient(180deg,#2b1f12,#221810);
  border-color:rgba(200,168,75,0.30);
  color:#F3ECD8;
}
.intention-opt-v2:hover,
.intention-opt-v2.sel-v2{
  border-color:rgba(228,196,118,0.65);
  background:linear-gradient(180deg,#3a2c18,#2c2113);
  color:#FBF3DC;
}

/* ===== Carte d'intention jour béni (vendredi / saison) — accentuée ===== */
.intention-opt-v2.intention-season{
  border-color:rgba(228,196,118,0.55);
  background:linear-gradient(180deg,#3c2b14,#2c1f10);
  box-shadow:0 0 20px rgba(200,150,70,0.18);
}
.intention-opt-v2.intention-season:hover,
.intention-opt-v2.intention-season.sel-v2{
  border-color:rgba(244,214,134,0.8);
  background:linear-gradient(180deg,#4a3518,#382711);
}
.intention-opt-v2.intention-season > div{
  color:#D8A24E!important;
  font-style:normal!important;
  text-transform:uppercase!important;
  letter-spacing:1.5px!important;
  font-size:11px!important;
  opacity:1!important;
}
```
REMPLACER PAR :
```
/* ===== Cartes d'intention (Ancrer votre Niyyah) — zellige ivoire ===== */
.intention-opt-v2{
  --zellige:url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='44'%20height='44'%3E%3Cg%20fill='none'%20stroke='%239A7434'%20stroke-width='0.9'%20opacity='0.5'%3E%3Cpath%20d='M37%2C22%2022%2C37%207%2C22%2022%2C7Z%20M32.6%2C32.6%2011.4%2C32.6%2011.4%2C11.4%2032.6%2C11.4Z'/%3E%3Cpath%20d='M15%2C0%200%2C15%20-15%2C0%200%2C-15Z%20M10.6%2C10.6%20-10.6%2C10.6%20-10.6%2C-10.6%2010.6%2C-10.6Z'/%3E%3Cpath%20d='M59%2C0%2044%2C15%2029%2C0%2044%2C-15Z%20M54.6%2C10.6%2033.4%2C10.6%2033.4%2C-10.6%2054.6%2C-10.6Z'/%3E%3Cpath%20d='M15%2C44%200%2C59%20-15%2C44%200%2C29Z%20M10.6%2C54.6%20-10.6%2C54.6%20-10.6%2C33.4%2010.6%2C33.4Z'/%3E%3Cpath%20d='M59%2C44%2044%2C59%2029%2C44%2044%2C29Z%20M54.6%2C54.6%2033.4%2C54.6%2033.4%2C33.4%2054.6%2C33.4Z'/%3E%3C/g%3E%3C/svg%3E");
  background-color:#F1E7D0;
  background-image:var(--zellige);
  background-repeat:repeat;
  border-color:rgba(150,116,52,0.55);
  color:#2C2113;
}
.intention-opt-v2:hover,
.intention-opt-v2.sel-v2{
  background-color:#ECDFC0;
  background-image:var(--zellige);
  border-color:rgba(176,134,56,0.95);
  box-shadow:inset 0 0 0 1px rgba(176,134,56,0.45);
  color:#241A0E;
}

/* ===== Carte jour béni (vendredi / saison) ===== */
.intention-opt-v2.intention-season{
  background-color:#F3E6C6;
  border-color:rgba(176,134,56,0.75);
  box-shadow:0 0 22px rgba(200,150,70,0.16);
}
.intention-opt-v2.intention-season:hover,
.intention-opt-v2.intention-season.sel-v2{
  background-color:#EFDBB0;
  border-color:rgba(176,134,56,1);
  box-shadow:0 0 22px rgba(200,150,70,0.22),inset 0 0 0 1px rgba(176,134,56,0.5);
  color:#241A0E;
}
.intention-opt-v2.intention-season > div{
  color:#7A4E12!important;
  font-style:normal!important;
  text-transform:uppercase!important;
  letter-spacing:1.5px!important;
  font-size:11px!important;
  opacity:1!important;
}

/* ===== Overlay remonté — fini le vide en haut ===== */
#niyyahModal-v2 .modal-sheet-v2{
  min-height:86vh;
  max-height:92vh;
  display:flex;
  flex-direction:column;
}
#niyyahModal-v2 .btn-confirm-v2{ margin-top:auto; }
```

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "cartes intention: zellige ivoire lisible + overlay remonte"
git push
```

## Curseurs réglables après test
- motif plus/moins visible : dans le SVG, `opacity='0.5'` → 0.35 (discret) ou 0.65 (marqué).
- ivoire plus chaud : `#F1E7D0` → `#F3E8CF` ; plus blanc : → `#F5F0E2`.
- overlay plus/moins haut : `min-height:86vh` → 80vh (plus bas) ou 90vh (presque plein écran).
