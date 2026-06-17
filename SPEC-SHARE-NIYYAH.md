# SPEC-PARTAGER — Bouton "Partager Niyyah"

## 1. Fonction utilitaire — ajouter après window.shareNiyyah

```js
function shareNiyyah() {
  var url = 'https://nabs881-sketch.github.io/niyyah-app/';
  var text = 'Je progresse spirituellement avec Niyyah — une app islamique francophone unique. Essaie gratuitement :';
  if (navigator.share) {
    navigator.share({ title: 'Niyyah', text: text, url: url });
  } else {
    navigator.clipboard.writeText(text + ' ' + url).then(function(){ v2ShowToast('Lien copié ✦'); });
  }
}
window.shareNiyyah = shareNiyyah;
```

## 2. Settings — ajouter après le bloc statut premium

```html
<div style="margin-top:12px;">
  <div onclick="shareNiyyah()" style="padding:13px 16px;border-radius:12px;border:1px solid rgba(200,168,75,0.25);background:rgba(200,168,75,0.05);text-align:center;cursor:pointer;font-family:'Cormorant Garamond',serif;font-size:15px;color:#C8A84A;letter-spacing:0.05em;">
    Partager Niyyah ✦
  </div>
  <div style="text-align:center;margin-top:8px;font-family:'Cormorant Garamond',serif;font-size:12px;font-style:italic;color:rgba(200,168,75,0.4);">
    « Celui qui guide vers le bien obtient la même récompense que celui qui le fait. » — Muslim 2674
  </div>
</div>
```

## 3. Bilan IA — ajouter après la lettre, avant le bouton fermer

```html
<div style="margin:12px 0;">
  <div onclick="shareNiyyah()" style="padding:11px;border-radius:10px;border:1px solid rgba(200,168,75,0.2);text-align:center;cursor:pointer;font-family:'Cormorant Garamond',serif;font-size:14px;color:rgba(200,168,75,0.7);letter-spacing:0.05em;">
    Partager Niyyah ✦
  </div>
  <div style="text-align:center;margin-top:7px;font-family:'Cormorant Garamond',serif;font-size:12px;font-style:italic;color:rgba(200,168,75,0.4);">
    « Celui qui guide vers le bien obtient la même récompense que celui qui le fait. » — Muslim 2674
  </div>
</div>
```

## 4. Fin de porte Bab an-Nafs — ajouter dans babCompletPorte()

```html
<div style="margin-top:16px;">
  <div onclick="shareNiyyah()" style="padding:11px;border-radius:10px;border:1px solid rgba(200,168,75,0.2);text-align:center;cursor:pointer;font-family:'Cormorant Garamond',serif;font-size:14px;color:rgba(200,168,75,0.7);">
    Partager Niyyah ✦
  </div>
  <div style="text-align:center;margin-top:7px;font-family:'Cormorant Garamond',serif;font-size:12px;font-style:italic;color:rgba(200,168,75,0.4);">
    « Celui qui guide vers le bien obtient la même récompense que celui qui le fait. » — Muslim 2674
  </div>
</div>
```

## Trigger

```
Lis SPEC-PARTAGER.md et applique-le.
npm run build && git add -A && git commit -m "feat: bouton partager Niyyah"
```
