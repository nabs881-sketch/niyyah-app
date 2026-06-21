# SPEC-SIRA-RDV126
# RDV 126 — Banū an-Naḍīr : Sept cents chameaux
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 126

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Six nuits. C'est tout ce qu'il fallut.

Pendant six nuits, les Banū an-Naḍīr attendirent derrière leurs murs. Ils attendirent Ibn Ubayy et ses deux mille hommes. Ils attendirent les Ghatafân. Ils attendirent les Banū Qurayẓa. La fumée de leurs palmiers brûlés montait encore. Les renforts ne vinrent pas. Le silence extérieur était total — et à l'intérieur des murs, nuit après nuit, ce silence fit son œuvre.

Allah jeta la terreur dans leur cœur. C'est la formule du Coran — et c'est exactement ce qui se passa. Non pas la peur des armes musulmanes, qui n'avaient pas encore frappé. Mais quelque chose de plus profond : la certitude que personne ne viendrait. Que les promesses étaient vides. Qu'ils étaient seuls face à un homme qu'ils avaient essayé de tuer, et qui attendait dehors, patient, sans colère apparente.

Au bout de six nuits, ils envoyèrent un message : « D'accord. Nous sortons. »

Le Prophète ﷺ posa une seule condition : « Vous partez avec vos familles. Vous emportez tout ce que vous pouvez transporter à dos de chameau — sauf vos armes. » La vie sauve. Les biens transportables. Les armes laissées.

Ils acceptèrent.

Et alors ils firent quelque chose que personne n'attendait.

Ils commencèrent à démolir leurs propres maisons. De leurs propres mains. Ils arrachèrent les portes de leurs gonds. Ils retirèrent les fenêtres. Ils arrachèrent les chevrons, les piquets de soutien, les poutres. Tout ce qui pouvait être chargé sur un chameau, tout ce qui pouvait être emporté, ils le démontèrent pierre par pierre, poutre par poutre.

Le bruit de la démolition dura des heures. Des maisons qui avaient tenu des générations s'effondraient par les mains de leurs propres propriétaires. Ils ne voulaient rien laisser. Pas une porte. Pas un linteau. Rien qui puisse servir à ceux qui resteraient après eux.

La haine, parfois, prend la forme d'une volonté de tout détruire avant de partir.

Puis ils chargèrent. Sept cents chameaux. Les femmes et les enfants installés sur les bêtes. Les coffres. Les étoffes. Tout ce qui avait de la valeur et pouvait voyager. Et ils partirent.

La procession s'étira sur des centaines de mètres. Médine les regarda partir. Ḥuyayy ibn Akhṭab — l'homme qui avait refusé de partir, l'homme qui avait cru aux promesses d'Ibn Ubayy — prit la route de Khaybar, l'oasis juive du nord, avec les chefs. Ce n'était pas la fin de son histoire. Il reviendra. Il tressera d'autres complots. Mais ce jour-là, il partait défait, sans avoir combattu, sans avoir reçu un seul coup d'épée.

Un autre groupe prit la direction de la Syrie.

Deux seulement restèrent — Yāmīn ibn ʿAmr et Abū Saʿd ibn Wahb — qui embrassèrent l'islam et conservèrent leurs biens.

Le Messager d'Allah ﷺ entra dans les forteresses vides. Le silence était différent maintenant. Plus lourd. Plus ancien. Ces murs avaient été construits pour durer des siècles. Leurs propriétaires les avaient eux-mêmes défaits en quelques heures.

Il trouva les armes. Cinquante cuirasses. Cinquante casques. Trois cent quarante épées.

Les armes que les Banū an-Naḍīr gardaient pour la suite. Les armes qu'ils n'avaient pas eu le temps d'utiliser.
```

---

## Correction champ `source`

**REMPLACER :**
```
Sîra classique (Ibn Hishâm / Ibn Isḥâq)
```
**PAR :**
```
Sourate al-Ḥashr (59) — Ibn Hishâm, Ibn Isḥâq
```

---

## Aucune modification pour :
- La méditation — validée telle quelle

## Build
```
Lis SPEC-SIRA-RDV126.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv126 enrichissement Sept cents chameaux Banu an-Nadir" && git push
```
