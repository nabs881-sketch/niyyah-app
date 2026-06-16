# SPEC-JOURNAL-INTRO — Overlay d'intro (1ʳᵉ fois) sur le Journal

**But.** Au **premier** accès au Journal (`v2GoJournal`), afficher l'overlay d'intro premium (`_showNiyyahIntro`) qui explique ce qu'est le Journal et ce qu'on y fait. Une seule fois, comme les autres écrans.

**Touche :** `script.js`. Front uniquement.

---

## 0. Diagnostic (LECTURE SEULE)
- `v2GoJournal()` (~L11514) ouvre la vue Journal (`view-journal`, onglets Niyyah/Regards). Glyphe arabe de l'entête : سِجِلّ.
- `_showNiyyahIntro(cfg)` global ; pose le flag sur « Entrer » puis appelle `enterFn` (l'appelant gate).

## 1. Gater v2GoJournal avec l'intro
Tout en **haut** de `v2GoJournal` (avant toute autre logique), ajoute :
```
if (safeGetItem('niyyah_intro_journal') !== '1') {
  _showNiyyahIntro({
    flag: 'niyyah_intro_journal',
    eyebrow: 'Niyyah t\u2019accompagne',
    nom_fr: 'Journal',
    nom_ar: '\u0633\u0650\u062C\u0650\u0644\u0651',
    texte: 'Ici se gardent tes deux gestes : les intentions que tu as pos\u00e9es et les Regards qui t\u2019ont marqu\u00e9. Reviens les relire, ajoute une note, ou partage un Regard \u00e0 un proche.',
    meta: 'reste sur ton appareil',
    enterLabel: 'Entrer',
    single: true,
    enterFn: function(){ v2GoJournal(); }
  });
  return;
}
```
Mécanique : « Entrer » pose le flag `niyyah_intro_journal` puis rappelle `v2GoJournal()` → cette fois le flag est posé → l'intro est sautée → le Journal s'ouvre.

## 2. Build
```
npm run build
git add -A && git commit -m "Journal: overlay d'intro 1re fois (sijill)" && git push
```

## Vérif
- 1er accès au Journal : overlay (orbe doré, « Journal / سِجِلّ », texte, « Entrer ») → puis le Journal.
- Accès suivants : Journal direct.
- (Re-test : supprimer `niyyah_intro_journal` du stockage.)
