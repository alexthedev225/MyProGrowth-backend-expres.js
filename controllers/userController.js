// backend/controllers/userController.js

const UserProfile = require('../models/UserProfile');

// Crée un profil utilisateur
exports.createUserProfile = async (req, res) => {
  try {
    const { fitnessGoals, skillsToDevelop, dailyHabits, emotionalWellbeing } = req.body;
    const userId = req.auth.userId;

    const userProfile = new UserProfile({
      user: userId,
      fitnessGoals,
      skillsToDevelop,
      dailyHabits,
      emotionalWellbeing,
    });

    await userProfile.save();

    return res.status(201).json({ message: 'Profil utilisateur créé avec succès.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la création du profil utilisateur.' });
  }
};

// Obtient le profil utilisateur d'un utilisateur spécifique
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userProfile = await UserProfile.findOne({ user: userId });

    if (!userProfile) {
      return res.status(404).json({ message: 'Profil utilisateur non trouvé.' });
    }

    return res.json(userProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération du profil utilisateur.' });
  }
};

const Conseil = require('../models/ConseilPerso');

// Obtient les conseils correspondant au profil utilisateur
exports.getUserConseils = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Récupérer le profil utilisateur
    const userProfile = await UserProfile.findOne({ user: userId });

    if (!userProfile) {
      return res.status(404).json({ message: 'Profil utilisateur non trouvé.' });
    }

    // Récupérer les conseils correspondants aux objectifs de fitness
    const conseilsFitness = await Conseil.find({ categorie: userProfile.fitnessGoals });

    // Récupérer les conseils correspondants aux compétences à développer
    const conseilsSkills = await Conseil.find({ categorie: userProfile.skillsToDevelop });

    // Récupérer les conseils correspondants aux habitudes quotidiennes
    const conseilsHabits = await Conseil.find({ categorie: userProfile.dailyHabits });

    // Récupérer les conseils correspondants au bien-être émotionnel
    const conseilsEmotional = await Conseil.find({ categorie: userProfile.emotionalWellbeing });

    // Créer une structure de données pour retourner les conseils
    const userConseils = {
      fitnessGoals: conseilsFitness,
      skillsToDevelop: conseilsSkills,
      dailyHabits: conseilsHabits,
      emotionalWellbeing: conseilsEmotional,
    };

    return res.json(userConseils);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des conseils utilisateur.' });
  }
};

