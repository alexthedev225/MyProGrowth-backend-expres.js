// seedConseils.js
const mongoose = require("mongoose");
const Conseil = require("./models/Conseil"); // Assure-toi de mettre le bon chemin vers ton modèle de données
require('dotenv').config()

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Définition des données à ajouter
const conseils = [
  { conseil: "Fais de l'exercice régulièrement pour rester en forme." },
  {
    conseil: "Prends le temps de méditer chaque jour pour apaiser ton esprit.",
  },
  {
    conseil:
      "Pratique la gratitude en notant trois choses pour lesquelles tu es reconnaissant chaque jour.",
  },
  {
  conseil: "Prends le temps de respirer profondément lorsque tu te sens stressé.",
},
{
  conseil: "Fixe-toi des objectifs réalisables chaque semaine pour te motiver.",
},
{
  conseil: "Consacre du temps à la lecture de livres inspirants ou éducatifs.",
},
{
  conseil: "Écoute de la musique apaisante pour te détendre après une journée chargée.",
},
{
  conseil: "Fais une pause et sors prendre l'air pour recharger ton énergie.",
},
{
  conseil: "Pratique la visualisation positive pour atteindre tes objectifs.",
},
{
  conseil: "Apprends une nouvelle compétence chaque mois pour stimuler ton cerveau.",
},
{
  conseil: "Évite les distractions numériques avant de dormir pour améliorer la qualité de ton sommeil.",
},
{
  conseil: "Partage tes succès avec tes proches pour renforcer les liens affectifs.",
},
{
  conseil: "Crée une routine matinale pour démarrer ta journée du bon pied.",
},
{
  conseil: "Sois indulgent envers toi-même et apprends à te pardonner tes erreurs.",
},
{
  conseil: "Écris dans un journal tes pensées et tes sentiments pour te libérer l'esprit.",
},
{
  conseil: "Déconnecte-toi des réseaux sociaux pendant quelques heures chaque jour.",
},
{
  conseil: "Pratique la reconnaissance en remerciant les personnes qui t'entourent.",
},
{
  conseil: "Fixe-toi des limites saines dans ta vie professionnelle et personnelle.",
},
{
  conseil: "Consomme des aliments sains et hydrate-toi régulièrement pour prendre soin de ton corps.",
},
{
  conseil: "Pratique la pleine conscience en étant attentif à tes sensations et à ton environnement.",
}

];

// Fonction pour insérer les conseils dans la base de données
const seedConseils = async () => {
  try {
    await Conseil.deleteMany(); // Supprime tous les conseils existants
    const insertedConseils = await Conseil.insertMany(conseils); // Insère les nouveaux conseils
    console.log("Conseils ajoutés avec succès :", insertedConseils);
  } catch (err) {
    console.error("Erreur lors de l'insertion des conseils :", err);
  } finally {
    mongoose.disconnect(); // Déconnexion de la base de données après l'insertion
  }
};

// Appel de la fonction d'insertion
seedConseils();
