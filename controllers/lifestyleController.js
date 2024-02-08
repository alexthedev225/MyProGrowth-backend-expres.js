// backend/controllers/lifestyleController.js

const Lifestyle = require('../models/Lifestyle');

// Opération CREATE (Création d'un mode de vie)
const createLifestyle = async (req, res) => {
  try {
    const { sleepHours, dailyExercise, eatingHabits } = req.body;

    const userId = req.auth.userId;

    // Crée un nouveau mode de vie
    const newLifestyle = new Lifestyle({
      userId,
      sleepHours,
      dailyExercise,
      eatingHabits,
    });

    // Sauvegarde le mode de vie dans la base de données
    await newLifestyle.save();

    return res.status(201).json({ message: 'Mode de vie créé avec succès.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la création du mode de vie.' });
  }
};

// Opération READ (Récupération du mode de vie d'un utilisateur)
const getUserLifestyle = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Recherche le mode de vie de l'utilisateur dans la base de données
    const userLifestyle = await Lifestyle.findOne({ userId });

    return res.status(200).json(userLifestyle);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération du mode de vie de l\'utilisateur.' });
  }
};

// Opération UPDATE (Mise à jour du mode de vie)
const updateLifestyle = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { sleepHours, dailyExercise, eatingHabits } = req.body;

    // Recherche le mode de vie de l'utilisateur dans la base de données
    const userLifestyle = await Lifestyle.findOne({ userId });

    if (!userLifestyle) {
      return res.status(404).json({ message: 'Mode de vie non trouvé.' });
    }

    // Met à jour les informations du mode de vie
    userLifestyle.sleepHours = sleepHours || userLifestyle.sleepHours;
    userLifestyle.dailyExercise = dailyExercise || userLifestyle.dailyExercise;
    userLifestyle.eatingHabits = eatingHabits || userLifestyle.eatingHabits;

    // Sauvegarde les modifications dans la base de données
    await userLifestyle.save();

    return res.status(200).json({ message: 'Mode de vie mis à jour avec succès.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour du mode de vie.' });
  }
};

// Opération DELETE (Suppression du mode de vie)
const deleteLifestyle = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Recherche et supprime le mode de vie de l'utilisateur dans la base de données
    const deletedLifestyle = await Lifestyle.findOneAndDelete({ userId });

    if (!deletedLifestyle) {
      return res.status(404).json({ message: 'Mode de vie non trouvé.' });
    }

    return res.status(200).json({ message: 'Mode de vie supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression du mode de vie.' });
  }
};

module.exports = {
  createLifestyle,
  getUserLifestyle,
  updateLifestyle,
  deleteLifestyle,
};
