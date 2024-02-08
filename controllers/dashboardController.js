// backend/controllers/dashboardController.js

const Dashboard = require('../models/Dashboard');
const Fitness = require('../models/Fitness');
const EmotionalWellness = require('../models/EmotionalWellness');
const Lifestyle = require('../models/Lifestyle');
const Skills = require('../models/Skills');

const getUserDashboard = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Recherche les informations centralisées de l'utilisateur dans la base de données
    const userDashboard = await Dashboard.findOne({ userId });

    // Récupère les entrées de condition physique de l'utilisateur
    const fitnessEntries = await Fitness.find({ userId });

    // Récupère les journaux de bien-être émotionnel de l'utilisateur
    const emotionalWellnessEntries = await EmotionalWellness.find({ userId });

    // Récupère les modes de vie de l'utilisateur
    const lifestyleEntries = await Lifestyle.find({ userId });

    // Récupère les compétences de l'utilisateur
    const skillsEntries = await Skills.find({ userId });

    // Combiner toutes les données dans le tableau de bord
    const combinedData = {
      userDashboard,
      fitnessEntries,
      emotionalWellnessEntries,
      lifestyleEntries,
      skillsEntries,
      // Ajoutez d'autres données au besoin
    };

    return res.status(200).json(combinedData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des informations du tableau de bord.' });
  }
};

module.exports = {
  getUserDashboard,
};
