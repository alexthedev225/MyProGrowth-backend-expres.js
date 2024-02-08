# MyProGrowth Backend

Bienvenue dans la partie backend de MyProGrowth. Cette section contient la logique serveur, les contrôleurs, les modèles, les routes, et la configuration nécessaires pour faire fonctionner l'application.

## Structure du Dossier

MyProGrowth
|-- backend
| |-- controllers
| |-- models
| |-- routes
| |-- config


- **controllers :** Contient les contrôleurs qui gèrent la logique métier de chaque route.
- **models :** Comprend les schémas de données MongoDB utilisés par l'application.
- **routes :** Définit les routes pour chaque fonctionnalité.
- **config :** Contient les fichiers de configuration, y compris les variables d'environnement.

## Installation et Configuration

1. **Installation des Dépendances :**
   ```bash
   npm install

Configuration de l'Environnement :
Crée un fichier .env à la racine du dossier backend.
Ajoute les variables d'environnement nécessaires, comme les clés secrètes et les informations de connexion à la base de données. Utilise .env.example comme modèle.
Scripts Disponibles
Dans le dossier backend, tu peux exécuter les commandes suivantes :

Démarrer le Serveur en Mode Développement :

npm run dev

Démarrer le Serveur en Mode Production :

npm start

Contribution
Si tu souhaite contribuer à l'amélioration du backend de MyProGrowth, suivez ces étapes :

Fork le projet.
Crée une branche pour ta fonctionnalité : git checkout -b feature/NomDeLaFonctionnalite
Commit tes changements : git commit -m "Ajoute une nouvelle fonctionnalité"
Push vers la branche : git push origin feature/NomDeLaFonctionnalite
Fais une pull request.