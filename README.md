# Clair — PWA anti-charge mentale (v0)

Projet mobile-first, local, open-source: vider sa tête et transformer le texte en actions.

Installation

1. Installer les dépendances :

```bash
npm install
```

2. Lancer en développement :

```bash
npm run dev
```

Fonctionnalités v0
- "Vide ma tête": zone de texte libre. Cliquer sur "Transformer en actions" crée des actions localement.
- Moteur local (pas d'IA) : séparation de phrases, mots-clés pour catégorisation, détection simple de dates relatives (aujourd'hui, demain, jours), urgence par mots.
- Pages : Aujourd'hui, Vide ma tête, À valider, Responsabilités, Paramètres.
- Stockage local via `localStorage`.

Vérification manuelle
- Aller sur `/vide`
- Entrer : “Je dois appeler l’assurance demain, acheter un cadeau samedi, répondre au mail de l’école, prendre rendez-vous chez le dentiste et regarder la facture EDF.”
- Cliquer sur “Transformer en actions”
- Vérifier que 5 actions sont créées
- Modifier une action
- Supprimer une action
- Valider une action
- Vérifier qu’elle apparaît dans “Aujourd’hui”
- Vérifier qu’elle apparaît dans “Responsabilités”
- Recharger la page
- Exporter les données
- Supprimer toutes les données

Limites de la v0
- Parser heuristique non-IA
- Données locales uniquement
- Pas de synchronisation multi-appareils
- Pas de compte utilisateur
- Pas de backend
- Service worker minimal
- Dates limitées à quelques cas simples
- Catégorisation imparfaite possible

Déploiement gratuit
- GitHub Pages : publier le dossier `dist` ou branch `gh-pages` en utilisant un workflow de build simple.
- Cloudflare Pages : déployer à partir du repository et utiliser `npm run build` comme commande de build.

Déploiement Cloudflare Pages
1. Pousser le projet sur GitHub.
2. Aller sur Cloudflare Pages.
3. Connecter le repository GitHub.
4. Choisir le framework Vite.
5. Build command : `npm run build`.
6. Output directory : `dist`.
7. Déployer.
8. Tester l’URL publique sur mobile.

Checklist avant déploiement
- `npm run test -- --run`
- `npm run build`
- tester `/vide`
- transformer une phrase en actions
- valider une action
- recharger la page
- vérifier la persistance `localStorage`
- exporter les données
- supprimer les données

Règles de confidentialité
- Toutes les données restent sur l'appareil (localStorage).
