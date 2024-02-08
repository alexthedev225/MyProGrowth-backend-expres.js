// backend/controllers/skillsController.js

const Skills = require('../models/Skills');

// Opération CREATE (Création d'une compétence)
const createSkill = async (req, res) => {
  try {
    const { skillName, skillLevel } = req.body;
    const userId = req.auth.userId;

    // Crée une nouvelle compétence
    const newSkill = new Skills({
      userId,
      skillName,
      skillLevel,
    });

    // Sauvegarde la compétence dans la base de données
    await newSkill.save();

    return res.status(201).json({ message: 'Compétence créée avec succès.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la création de la compétence.' });
  }
};

// Opération READ (Récupération des compétences d'un utilisateur)
const getUserSkills = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Recherche les compétences de l'utilisateur dans la base de données
    const userSkills = await Skills.find({ userId });

    return res.status(200).json(userSkills);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des compétences de l\'utilisateur.' });
  }
};

// Opération UPDATE (Mise à jour d'une compétence)
const updateSkill = async (req, res) => {
  try {
    const skillId = req.params.skillId;
    const { skillName, skillLevel } = req.body;

    // Recherche la compétence par ID dans la base de données
    const skill = await Skills.findById(skillId);

    if (!skill) {
      return res.status(404).json({ message: 'Compétence non trouvée.' });
    }

    // Met à jour les informations de la compétence
    skill.skillName = skillName || skill.skillName;
    skill.skillLevel = skillLevel || skill.skillLevel;

    // Sauvegarde les modifications dans la base de données
    await skill.save();

    return res.status(200).json({ message: 'Compétence mise à jour avec succès.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour de la compétence.' });
  }
};

// Opération DELETE (Suppression d'une compétence)
const deleteSkill = async (req, res) => {
  try {
    const skillId = req.params.skillId;

    // Recherche et supprime la compétence par ID dans la base de données
    const deletedSkill = await Skills.findByIdAndDelete(skillId);

    if (!deletedSkill) {
      return res.status(404).json({ message: 'Compétence non trouvée.' });
    }

    return res.status(200).json({ message: 'Compétence supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de la compétence.' });
  }
};

module.exports = {
  createSkill,
  getUserSkills,
  updateSkill,
  deleteSkill,
};
