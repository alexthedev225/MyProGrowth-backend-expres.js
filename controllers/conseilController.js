// controllers/conseilController.js

const Conseil = require('../models/Conseil');

let cachedRandomIndex = null; // Variable globale pour stocker le nombre aléatoire
let lastRandomUpdateTime = null; // Variable globale pour stocker la date/heure de la dernière mise à jour du nombre aléatoire

// Fonction pour générer un nombre aléatoire entre 0 et max (exclus)
function generateRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

exports.getConseilAleatoire = async (req, res) => {
  try {
    const currentTime = new Date();
    const timeSinceLastUpdate = lastRandomUpdateTime ? currentTime - lastRandomUpdateTime : null;
    
    // Si le nombre aléatoire est en cache et moins de 24 heures se sont écoulées depuis sa dernière mise à jour
    if (cachedRandomIndex && timeSinceLastUpdate && timeSinceLastUpdate < 24 * 60 * 60 * 1000) {
      // Utiliser le nombre aléatoire précédemment généré
      const conseil = await Conseil.findOne().skip(cachedRandomIndex);
      return res.json(conseil);
    }

    // Si le nombre aléatoire n'est pas en cache ou s'il est périmé, générer un nouveau nombre aléatoire
    const count = await Conseil.countDocuments();
    const randomIndex = generateRandomIndex(count);

    // Mettre à jour le nombre aléatoire en cache et la date/heure de la dernière mise à jour
    cachedRandomIndex = randomIndex;
    lastRandomUpdateTime = currentTime;

    // Récupérer le conseil correspondant au nouveau nombre aléatoire généré
    const conseil = await Conseil.findOne().skip(randomIndex);
    res.json(conseil);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération du conseil aléatoire' });
  }
};



// Ajoute un nouveau conseil
exports.createConseil = async (req, res) => {
  try {
    const { conseil } = req.body;
    const newConseil = await Conseil.create({ conseil });
    res.status(201).json(newConseil);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la création du conseil' });
  }
};

// Récupère un conseil spécifique par son ID
exports.getConseilById = async (req, res) => {
  try {
    const { id } = req.params;
    const conseil = await Conseil.findById(id);
    if (!conseil) {
      return res.status(404).json({ message: 'Conseil non trouvé' });
    }
    res.json(conseil);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération du conseil' });
  }
};

// Met à jour un conseil existant par son ID
exports.updateConseilById = async (req, res) => {
  try {
    const { id } = req.params;
    const { conseil } = req.body;
    const updatedConseil = await Conseil.findByIdAndUpdate(id, { conseil }, { new: true });
    if (!updatedConseil) {
      return res.status(404).json({ message: 'Conseil non trouvé' });
    }
    res.json(updatedConseil);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du conseil' });
  }
};

// Supprime un conseil existant par son ID
exports.deleteConseilById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedConseil = await Conseil.findByIdAndDelete(id);
    if (!deletedConseil) {
      return res.status(404).json({ message: 'Conseil non trouvé' });
    }
    res.json({ message: 'Conseil supprimé avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la suppression du conseil' });
  }
};
