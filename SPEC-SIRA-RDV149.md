# SPEC-SIRA-RDV149
# RDV 149 — Vers Ḥudaybiya : Le rêve
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 149

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Six ans qu'il n'avait pas vu la Kaʿba.

Pour les Muhâjirûn — les Compagnons qui avaient quitté La Mecque avec lui — six ans signifiait autre chose que du temps. La Mecque n'était pas seulement leur ville d'origine. C'était la maison qu'Ibrâhîm ﷺ avait construite sur ordre d'Allah. C'était la qibla vers laquelle ils priaient cinq fois par jour, le visage tourné dans sa direction depuis Médine, imaginant sans voir. C'était la Pierre Noire que le Prophète ﷺ avait touchée de ses propres mains avant l'Hégire, et qu'il n'avait pas touchée depuis. Six ans de prières tournées vers un endroit qu'on ne pouvait pas atteindre.

Une nuit, il rêva.

Il se vit entrant à La Mecque. Il fit le tawâf — sept circuits autour de la Kaʿba. Il prit la clé de la maison entre ses mains. Autour de lui, certains Compagnons se rasaient la tête entièrement après le rite, d'autres raccourcissaient leurs cheveux — les deux gestes qui marquent la fin de la ʿumra, le pèlerinage mineur. Tout se passait comme il devait se passer. Proprement. Complètement.

Au réveil, il appela ses Compagnons.

Il leur raconta le rêve. Les visages s'éclairèrent. Les rêves des Prophètes sont vrais — une vision prophétique n'est pas un espoir ordinaire, c'est une information. Et l'information était claire : cette année, on rentrait à La Mecque. On ferait la ʿumra. La maison reverrait son Prophète.

L'enthousiasme fut immédiat. Mais sous l'enthousiasme, une question que personne ne posait à voix haute : La Mecque était encore aux mains des Quraysh. Ces mêmes Quraysh qui avaient levé dix mille hommes l'année précédente pour effacer Médine. Est-ce qu'ils laisseraient les musulmans entrer dans leur ville ?

Le Messager d'Allah ﷺ ne s'en préoccupa pas. Il annonça publiquement : « Je vais faire la ʿumra. Que ceux qui veulent me suivre se préparent. »

Mille quatre cents hommes se levèrent. Peut-être mille cinq cents selon les sources. Ils prirent ce qu'on prend pour la ʿumra : le sabre court du voyageur — le seul autorisé pour un pèlerin en ihrâm — mais pas d'armure, pas de lances, pas d'armes de guerre. Soixante-dix chameaux furent marqués pour le sacrifice à la Kaʿba.

Ils partaient comme des pèlerins. Délibérément. Ostensiblement. C'était cela, le message que le Prophète ﷺ voulait envoyer à toute l'Arabie : nous venons en paix, nous venons pour adorer, nous venons pour la maison d'Allah. Pas pour la conquête.

À Dhū al-Ḥulayfa — la limite sacrée au sud de Médine — le Prophète ﷺ s'arrêta. Il revêtit les deux pièces de tissu blanc de l'ihrâm. Il égorgea symboliquement les chameaux de sacrifice, les marquant pour Allah. Il monta sa chamelle al-Qaṣwâ'. Et il leva la voix avec la talbiya — ce chant antique qu'Ibrâhîm ﷺ lui-même avait prononcé en appelant les hommes au pèlerinage :

« Labbayk Allâhumma labbayk. Labbayka lâ sharîka laka labbayk. Inna-l-ḥamda wa-n-niʿmata laka wa-l-mulk. Lâ sharîka lak. »

Me voici, ô Allah, me voici. Me voici, Tu n'as pas d'associé, me voici. Toute louange et toute grâce T'appartiennent, et la royauté. Tu n'as pas d'associé.

Mille cinq cents voix reprirent la talbiya. La colonne blanche s'ébranla vers le sud-ouest.

Ils ne savaient pas encore ce qui les attendait. Le rêve avait montré l'arrivée — pas le chemin. Et le chemin, cette fois, passerait par un endroit appelé Ḥudaybiya. Et ce qui s'y passerait n'avait jamais été tenté dans la jeune histoire de l'islam.

Allah avait déjà validé. La sourate al-Fath le confirmerait, révélée sur le chemin du retour : « Allah a exaucé la vision de Son Messager en toute vérité : vous entrerez dans la Mosquée Sacrée, si Allah le veut, en sécurité, la tête rasée ou les cheveux raccourcis. » (48:27)

La vision était vraie. La route serait plus longue que prévu. Mais la maison attendait.
```

---

## Correction champ `source`

**REMPLACER :**
```
Sourate Al-Fatḥ (48:27)
```
**PAR :**
```
Sourate al-Fath (48:27) — Ibn Hishâm
```

---

## Aucune modification pour :
- La méditation — validée telle quelle

## Build
```
Lis SPEC-SIRA-RDV149.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv149 enrichissement Le reve Hudaybiya umra talbiya" && git push
```
