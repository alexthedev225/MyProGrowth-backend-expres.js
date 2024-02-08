// backend/controllers/emotionalWellnessController.js

const EmotionalWellness = require('../models/EmotionalWellness');

// Opération CREATE (Création d'un journal de bien-être émotionnel)
const createEmotionalWellnessEntry = async (req, res) => {
  try {
    const {entryDate, emotion, moodDescription } = req.body;
    const userId = req.auth.userId;

    // Crée un nouveau journal de bien-être émotionnel
    const newEmotionalWellnessEntry = new EmotionalWellness({
      userId,
      entryDate,
      emotion,
      moodDescription,
    });

    // Sauvegarde le journal de bien-être émotionnel dans la base de données
    await newEmotionalWellnessEntry.save();

    return res.status(201).json({ message: 'Journal de bien-être émotionnel créé avec succès.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la création du journal de bien-être émotionnel.' });
  }
};

// Opération READ (Récupération des journaux de bien-être émotionnel d'un utilisateur)
const getUserEmotionalWellnessEntries = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Recherche les journaux de bien-être émotionnel de l'utilisateur dans la base de données
    const userEmotionalWellnessEntries = await EmotionalWellness.find({ userId });

    return res.status(200).json(userEmotionalWellnessEntries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des journaux de bien-être émotionnel de l\'utilisateur.' });
  }
};

// Opération UPDATE (Mise à jour d'un journal de bien-être émotionnel)
const updateEmotionalWellnessEntry = async (req, res) => {
  try {
    const entryId = req.params.entryId;
    const { entryDate, emotion, moodDescription } = req.body;

    // Recherche le journal de bien-être émotionnel par ID dans la base de données
    const emotionalWellnessEntry = await EmotionalWellness.findById(entryId);

    if (!emotionalWellnessEntry) {
      return res.status(404).json({ message: 'Journal de bien-être émotionnel non trouvé.' });
    }

    // Met à jour les informations du journal de bien-être émotionnel
    emotionalWellnessEntry.entryDate = entryDate || emotionalWellnessEntry.entryDate;
    emotionalWellnessEntry.emotion = emotion || emotionalWellnessEntry.emotion;
    emotionalWellnessEntry.moodDescription = moodDescription || emotionalWellnessEntry.moodDescription;

    // Sauvegarde les modifications dans la base de données
    await emotionalWellnessEntry.save();

    return res.status(200).json({ message: 'Journal de bien-être émotionnel mis à jour avec succès.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour du journal de bien-être émotionnel.' });
  }
};

// Opération DELETE (Suppression d'un journal de bien-être émotionnel)
const deleteEmotionalWellnessEntry = async (req, res) => {
  try {
    const entryId = req.params.entryId;

    // Recherche et supprime le journal de bien-être émotionnel par ID dans la base de données
    const deletedEmotionalWellnessEntry = await EmotionalWellness.findByIdAndDelete(entryId);

    if (!deletedEmotionalWellnessEntry) {
      return res.status(404).json({ message: 'Journal de bien-être émotionnel non trouvé.' });
    }

    return res.status(200).json({ message: 'Journal de bien-être émotionnel supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression du journal de bien-être émotionnel.' });
  }
};

module.exports = {
  createEmotionalWellnessEntry,
  getUserEmotionalWellnessEntries,
  updateEmotionalWellnessEntry,
  deleteEmotionalWellnessEntry,
};
