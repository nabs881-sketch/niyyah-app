# SPEC-PURIFICATION-VOYAGEUR — Section Prière & Purification dans Repères

## Objectif
Ajouter une nouvelle section "PRIÈRE & PURIFICATION" dans l'overlay Repères, avec 3 cartes : Wudu, Tayammum, Qasr/Jam'. Chaque carte ouvre un overlay dédié, comme Qadâ' et Istikhâra.

---

## 1. PLACEMENT DANS REPÈRES

Insérer après la section "S'orienter" (Istikhâra) et avant "Aumônes" (Zakât) :

```
S'orienter → Istikhâra
── PRIÈRE & PURIFICATION ──   ← nouveau divider eb()
  renderWuduCard()
  renderTayammumCard()
  renderQasrCard()
Aumônes → Zakât + Zakât al-Fitr
...
```

---

## 2. CARTE WUDU — renderWuduCard()

Carte d'entrée identique aux autres cartes Repères. Tap → openWudu().

**openWudu()** : overlay plein écran z-index:3200

```
Scheherazade New 42px, #C8A84A  ←  الوُضُوء
Wudu — Les ablutions            ← Cormorant 25px
Conditions et ce qui l'annule   ← italic 14px
```

### Contenu renderWuduBody()

**Bloc 1 — CE QUI L'ANNULE** (label 10px letterspaced gold)
Liste 5 items avec séparateurs fins :
- Passage aux toilettes (petite ou grande)
- Sommeil profond (allongé ou assis sans appui)
- Perte de conscience / évanouissement
- Rapport intime
- Saignement abondant *(note discrète italic : "avis divergent selon les madhabs")*

**Bloc 2 — ÉTAPES** (label 10px letterspaced gold)
Liste numérotée 1→6 :
1. Intention (niyyah) — dans le cœur
2. Bismillah
3. Se laver les mains 3×
4. Se rincer la bouche et le nez 3×
5. Se laver le visage 3×
6. Se laver les bras jusqu'aux coudes 3× (droit puis gauche)
7. Passer les mains humides sur la tête
8. Se laver les pieds jusqu'aux chevilles 3× (droit puis gauche)

**Source** (bas de page, italic 11px, or à 40%) :
*Coran 5:6 — Bukhari 135, Muslim 226*

---

## 3. CARTE TAYAMMUM — renderTayammumCard()

Tap → openTayammum()

```
Scheherazade New 42px, #C8A84A  ←  التَّيَمُّم
Tayammum — Purification sèche   ← Cormorant 25px
Quand l'eau est absente         ← italic 14px
```

### Contenu renderTayammumBody()

**Bloc 1 — CONDITIONS** (label gold)
- Absence d'eau après recherche
- Maladie où l'eau est nuisible
- Eau dangereuse ou inaccessible à atteindre
- Temps de prière imminent sans possibilité de trouver de l'eau

**Bloc 2 — ÉTAPES** (label gold)
1. Intention (niyyah)
2. Frapper la terre propre (ou pierre, sable) avec les deux paumes
3. Essuyer le visage avec les paumes
4. Frapper à nouveau
5. Essuyer le dos de la main droite avec la paume gauche, puis inversement

**Note** (italic, or à 50%) :
*Le tayammum est annulé par les mêmes choses que le wudu, et dès que l'eau devient accessible.*

**Source** :
*Coran 4:43 — Bukhari 338, Muslim 368*

---

## 4. CARTE QASR/JAM' — renderQasrCard()

Tap → openQasr()

```
Scheherazade New 42px, #C8A84A  ←  صَلَاةُ السَّفَر
Prière du voyageur               ← Cormorant 25px
Raccourcir et regrouper          ← italic 14px
```

### Contenu renderQasrBody()

**Bloc 1 — QASR (raccourcir)** (label gold)
Condition : distance ≥ 80 km (avis majoritaire)

Tableau 2 colonnes "NORMALE / EN VOYAGE" :
- Fajr : 2 rak'a / 2 rak'a (inchangé)
- Dhuhr : 4 rak'a / 2 rak'a
- Asr : 4 rak'a / 2 rak'a
- Maghrib : 3 rak'a / 3 rak'a (inchangé)
- Isha : 4 rak'a / 2 rak'a

**Bloc 2 — JAM' (regrouper)** (label gold)
Deux combinaisons possibles :
- Dhuhr + Asr ensemble
- Maghrib + Isha ensemble

Taqdim (avancer à l'heure de la 1ère) ou Ta'khir (retarder à l'heure de la 2ème)

**Note** (italic, or à 50%) :
*Le qasr et le jam' sont permis dès le départ, même en ville de destination.*

**Source** :
*Bukhari 1090, Muslim 686*

---

## 5. DESIGN — identique aux overlays existants

```css
/* Overlay */
position: fixed; inset: 0; z-index: 3200;
background: radial-gradient(ellipse at top, #1a1208 0%, #0d0a06 100%);
overflow-y: auto; padding: 24px 20px 40px;

/* Titre arabe */
font-family: 'Scheherazade New', serif;
font-size: 42px; color: #C8A84A; text-align: center;

/* Titre français */
font-family: 'Cormorant Garamond', serif;
font-size: 25px; color: #e8d9bc; text-align: center;

/* Label blocs */
font-size: 10px; letter-spacing: 2.5px; color: #C8A84A;
margin: 18px 0 10px;

/* Items liste */
font-size: 14px; color: #e8d9bc;
padding: 10px 0; border-bottom: 0.5px solid rgba(200,168,74,0.1);

/* Note discrète */
font-size: 11px; font-style: italic; color: rgba(200,168,74,0.4);

/* Source */
font-size: 11px; font-style: italic;
color: rgba(232,217,188,0.3); text-align: center;
margin-top: 24px;

/* Bouton fermeture */
/* Identique aux autres overlays — × en haut à droite */
```

---

## Règles
- Zéro arabe fabriqué — uniquement les titres arabes listés ci-dessus
- Aucune nouvelle dépendance
- npm run build après modifications

## Trigger Claude Code

```
Lis SPEC-PURIFICATION-VOYAGEUR.md et applique-le
```
