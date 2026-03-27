# 📅 Système de Gestion de Réservations (TDD)

Ce projet est un module Node.js de gestion de réservations développé en suivant strictement la méthodologie **Test-Driven Development (TDD)** : *Red → Green → Refactor*.

---

## 🚀 Installation

### Prérequis
- [Node.js](https://nodejs.org/) (version 16+ recommandée)
- [npm](https://www.npmjs.com/)

### Étapes
1. Clonez ou téléchargez ce dépôt.
2. Installez les dépendances nécessaires (Jest) :
   ```bash
   npm install
   ```

---

## 🧪 Tests & Qualité

Le projet utilise **Jest** avec le support natif des **ES Modules**. 

Pour lancer la suite complète de tests et vérifier l'intégrité du système :
```bash
npm test
```

> [!NOTE]
> Le script de test utilise l'option `--experimental-vm-modules` pour permettre l'import/export natif dans l'environnement Jest.

---

## 🛠️ Fonctionnalités Implémentées

### 1. Création de Réservation (`createReservation`)
Permet de valider et d'enregistrer une nouvelle réservation.
- **Validations strictes** : Présence obligatoire de l'ID, du nom et des dates.
- **Chronologie** : La date de fin doit impérativement être après la date de début.
- **Disponibilité** : Vérification automatique du non-chevauchement avec les réservations existantes.
- **Cas limite** : Une réservation peut débuter exactement au moment où une autre se termine.

### 2. Annulation de Réservation (`cancelReservation`)
Gère l'annulation sécurisée selon des règles métier.
- **Règle des 48h** : L'annulation est refusée si elle est demandée moins de 48 heures avant le début de la prestation.
- **Sécurité** : Vérification systématique de l'existence de la réservation avant toute action.

### 3. Recherche par Date (`findReservationsByDate`)
Permet de filtrer et d'extraire les réservations actives à un instant précis.
- Une réservation est considérée comme **active** si : `Date début ≤ Date recherchée ≤ Date fin`.

---

## 📂 Structure du Projet

```text
.
├── src/
│   ├── cancelReservation.js   # Logique d'annulation
│   ├── createReservation.js   # Logique de création et validation
│   ├── findReservation.js     # Logique de recherche
│   └── errors.js              # Classes d'erreurs personnalisées (ValidationError, ServiceError)
├── test/
│   ├── cancelReservation.test.js
│   ├── createReservation.test.js
│   └── findReservation.test.js
├── package.json               # Configuration et scripts npm
└── README.md                  # Documentation du projet
```

---

## ⚠️ Gestion des Erreurs

Le module utilise des exceptions personnalisées pour une meilleure gestion des retours :
- `ValidationError` (400) : Erreurs de saisie ou non-respect des règles métier.
- `ServiceError` (503) : Erreurs liées au service ou indisponibilité.

---
*Projet réalisé dans le cadre de l'évaluation TDD.*
