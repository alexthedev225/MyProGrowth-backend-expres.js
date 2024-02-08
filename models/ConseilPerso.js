const mongoose = require('mongoose');

// Définition du schéma pour les conseils
const conseilPersoSchema = new mongoose.Schema({
  conseil: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
});

// Création du modèle Conseil à partir du schéma
const ConseilPerso = mongoose.model('ConseilPerso', conseilPersoSchema);

// Export du modèle pour pouvoir l'utiliser ailleurs dans votre application
module.exports = ConseilPerso;
