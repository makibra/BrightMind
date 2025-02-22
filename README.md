# BrightMind - Plateforme e-Learning

BrightMind est une plateforme d'e-learning complète permettant aux enseignants de proposer, créer et gérer des cours, tandis que les étudiants peuvent acheter et suivre ces formations en ligne. La plateforme est disponible sous forme d'un site web et d'une application mobile Android.

## 📌 Fonctionnalités principales

### 🎓 Pour les enseignants
- Création et gestion des cours (ajout de vidéos, documents, quiz, etc.)
- Suivi des inscriptions et des performances des étudiants
- Interaction avec les étudiants via des forums ou des sessions de Q&A

### 👨‍🎓 Pour les étudiants
- Achat et accès aux cours en ligne
- Progression et suivi des modules complétés
- Participation aux forums et interaction avec les enseignants

### 👤 Pour les invités
- Consultation des cours disponibles
- Accès limité aux ressources publiques

### 🔍 Pour les administrateurs
- Gestion des utilisateurs (étudiants, enseignants, invités)
- Analyse des statistiques (profits, popularité des cours, ventes, etc.)

## 🚀 Technologies utilisées
- **Frontend Web** : React.js
- **Application Mobile** : Android (Java/Kotlin)
- **Backend** : Node.js avec Express
- **Base de données** : MongoDB
- **Authentification** : Firebase Auth

## 📂 Structure du projet
```
BrightMind/
├── backend/        # API et gestion des données
├── frontend/       # Interface utilisateur web (React.js)
├── mobile/         # Application Android (Java/Kotlin)
├── docs/           # Documentation du projet
└── README.md       # Présentation du projet
```

## 📖 Installation & Exécution

### 🔧 Prérequis
- Node.js installé
- MongoDB installé
- Android Studio (pour l'application mobile)

### 🖥️ Installation
```bash
# Cloner le projet
git clone https://github.com/ton-utilisateur/BrightMind.git
cd BrightMind

# Installation des dépendances Backend
cd backend
npm install

# Installation des dépendances Frontend
cd ../frontend
npm install

# Installation des dépendances Mobile
cd ../mobile
gradlew build
```

### ▶️ Lancer l'application
```bash
# Démarrer le backend
cd backend
npm start

# Démarrer le frontend
cd ../frontend
npm start
```

## 🎯 Auteurs
- **Ibrahim Makhlouf**  
- **BRAHMI Mouad**

## 🏆 Licence
Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
