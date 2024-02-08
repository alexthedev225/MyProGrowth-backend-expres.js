// backend/controllers/fitnessController.js

const Fitness = require('../models/Fitness');

// Opération CREATE (Création d'une entrée de condition physique)
const createFitnessEntry = async (req, res) => {
  try {
    const { exerciseType, duration, caloriesBurned, date } = req.body;

    const userId = req.auth.userId;

    // Crée une nouvelle entrée de condition physique
    const newFitnessEntry = new Fitness({
      userId,
      exerciseType,
      duration,
      caloriesBurned,
      date,
    });

    // Sauvegarde l'entrée de condition physique dans la base de données
    await newFitnessEntry.save();

    return res.status(201).json({ message: 'Entrée de condition physique créée avec succès.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la création de l\'entrée de condition physique.' });
  }
};

// Opération READ (Récupération des entrées de condition physique d'un utilisateur)
const getUserFitnessEntries = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Recherche les entrées de condition physique de l'utilisateur dans la base de données
    const userFitnessEntries = await Fitness.find({ userId });

    return res.status(200).json(userFitnessEntries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des entrées de condition physique de l\'utilisateur.' });
  }
};

// Opération UPDATE (Mise à jour d'une entrée de condition physique)
const updateFitnessEntry = async (req, res) => {
  try {
    const entryId = req.params.entryId;
    const { exerciseType, duration, caloriesBurned, date } = req.body;

    // Recherche l'entrée de condition physique par ID dans la base de données
    const fitnessEntry = await Fitness.findById(entryId);

    if (!fitnessEntry) {
      return res.status(404).json({ message: 'Entrée de condition physique non trouvée.' });
    }

    // Met à jour les informations de l'entrée de condition physique
    fitnessEntry.exerciseType = exerciseType || fitnessEntry.exerciseType;
    fitnessEntry.duration = duration || fitnessEntry.duration;
    fitnessEntry.caloriesBurned = caloriesBurned || fitnessEntry.caloriesBurned;
    fitnessEntry.date = date || fitnessEntry.date;

    // Sauvegarde les modifications dans la base de données
    await fitnessEntry.save();

    return res.status(200).json({ message: 'Entrée de condition physique mise à jour avec succès.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour de l\'entrée de condition physique.' });
  }
};

// Opération DELETE (Suppression d'une entrée de condition physique)
const deleteFitnessEntry = async (req, res) => {
  try {
    const entryId = req.params.entryId;

    // Recherche et supprime l'entrée de condition physique par ID dans la base de données
    const deletedFitnessEntry = await Fitness.findByIdAndDelete(entryId);

    if (!deletedFitnessEntry) {
      return res.status(404).json({ message: 'Entrée de condition physique non trouvée.' });
    }

    return res.status(200).json({ message: 'Entrée de condition physique supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de l\'entrée de condition physique.' });
  }
};

module.exports = {
  createFitnessEntry,
  getUserFitnessEntries,
  updateFitnessEntry,
  deleteFitnessEntry,
};
