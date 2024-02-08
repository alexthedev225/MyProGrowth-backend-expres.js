const Conseil = require("./models/ConseilPerso"); // Assurez-vous d'importer votre modèle de données Conseil
const mongoose = require('mongoose')
require("dotenv").config();

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Liste des conseils par catégorie
const conseilsParCategorie = {
    "Perte de poids": [
        "Buvez beaucoup d'eau tout au long de la journée pour rester hydraté.",
        "Favorisez les aliments riches en fibres pour favoriser la satiété.",
        "Privilégiez les entraînements cardiovasculaires pour brûler les graisses.",
        "Évitez les aliments transformés et riches en sucres ajoutés.",
        // Ajoutez d'autres conseils pour la perte de poids
      ],
      "Prise de masse musculaire": [
        "Consommez suffisamment de protéines pour favoriser la croissance musculaire.",
        "Entraînez-vous avec des poids lourds pour stimuler la croissance musculaire.",
        "Assurez-vous de bien récupérer entre les séances d'entraînement pour permettre à vos muscles de se développer.",
        "Incorporez des exercices composés dans votre routine pour solliciter plusieurs groupes musculaires à la fois.",
        // Ajoutez d'autres conseils pour la prise de masse musculaire
      ],
      "Amélioration de la condition physique": [
        "Faites de l'exercice régulièrement pour améliorer votre endurance et votre force.",
        "Variez vos entraînements pour éviter la stagnation et stimuler votre progression.",
        "Assurez-vous de bien vous échauffer avant chaque séance d'entraînement pour prévenir les blessures.",
        "Écoutez votre corps et reposez-vous suffisamment entre les séances d'entraînement intenses.",
        // Ajoutez d'autres conseils pour l'amélioration de la condition physique
      ],
      "Développement personnel": [
        "Fixez-vous des objectifs clairs et atteignables pour rester motivé et concentré.",
        "Pratiquez la gratitude quotidienne pour cultiver un état d'esprit positif.",
        "Prenez du temps pour vous-même chaque jour pour vous détendre et vous ressourcer.",
        "Apprenez de nouvelles compétences ou hobbies pour stimuler votre croissance personnelle.",
        // Ajoutez d'autres conseils pour le développement personnel
      ], "Compétences professionnelles": [
        "Identifiez vos forces et faiblesses professionnelles pour mieux vous développer.",
        "Prenez des initiatives au travail et soyez proactif dans votre domaine.",
        "Développez vos compétences en communication pour mieux interagir avec vos collègues et clients.",
        "Investissez dans la formation continue pour rester pertinent et compétitif sur le marché du travail.",
        // Ajoutez d'autres conseils pour les compétences professionnelles
      ],
      "Compétences relationnelles": [
        "Pratiquez l'empathie pour mieux comprendre les émotions et les perspectives des autres.",
        "Travaillez sur vos compétences en écoute active pour améliorer la communication interpersonnelle.",
        "Soyez ouvert aux feedbacks constructifs et utilisez-les comme opportunités d'apprentissage.",
        "Développez votre intelligence émotionnelle pour gérer efficacement les relations interpersonnelles.",
        // Ajoutez d'autres conseils pour les compétences relationnelles
      ],
      "Routine de sport": [
        "Établissez un horaire d'entraînement régulier et respectez-le autant que possible.",
        "Variez vos activités sportives pour travailler différents groupes musculaires et éviter l'ennui.",
        "Incorporez des exercices de récupération active, comme le yoga ou les étirements, dans votre routine.",
        "Fixez-vous des objectifs réalisables et mesurables pour maintenir votre motivation.",
        // Ajoutez d'autres conseils pour la routine de sport
      ],
      "Méditation quotidienne": [
        "Pratiquez la méditation de pleine conscience chaque jour pour calmer votre esprit et réduire le stress.",
        "Trouvez un endroit calme et confortable où vous pourrez méditer sans être dérangé.",
        "Utilisez des applications de méditation guidée pour vous aider à rester concentré et motivé.",
        "Fixez-vous un horaire régulier pour méditer, de préférence le matin ou avant de vous coucher.",
        // Ajoutez d'autres conseils pour la méditation quotidienne
      ],
      "Planification des tâches": [
        "Utilisez un calendrier ou une application de planification pour organiser vos tâches et vos rendez-vous.",
        "Définissez des priorités pour vos tâches et concentrez-vous sur celles qui sont les plus importantes.",
        "Allouez du temps spécifique pour chaque tâche et évitez de procrastiner.",
        "Revoyez votre planification régulièrement pour vous assurer de rester sur la bonne voie.",
        // Ajoutez d'autres conseils pour la planification des tâches
      ],
      "Gestion du stress": [
        "Pratiquez des techniques de respiration profonde pour vous détendre lorsque vous vous sentez stressé.",
        "Faites de l'exercice régulièrement pour libérer des endorphines et réduire le stress.",
        "Apprenez à dire non aux demandes excessives et à déléguer des tâches lorsque cela est possible.",
        "Trouvez des activités relaxantes qui vous aident à vous détendre, comme la lecture ou le jardinage.",
        // Ajoutez d'autres conseils pour la gestion du stress
      ],"Développement de la résilience": [
        "Cultivez une attitude positive envers les défis de la vie et voyez-les comme des opportunités d'apprentissage.",
        "Apprenez à accepter l'incertitude et les changements inévitables de la vie sans perdre votre équilibre émotionnel.",
        "Développez votre capacité à rebondir après des échecs en tirant des leçons de chaque expérience.",
        "Nourrissez vos relations sociales et demandez du soutien lorsque vous en avez besoin pour renforcer votre résilience.",
        // Ajoutez d'autres conseils pour le développement de la résilience
      ],
      "Équilibre émotionnel": [
        "Pratiquez la pleine conscience en vous concentrant sur le moment présent et en acceptant vos émotions sans les juger.",
        "Identifiez les déclencheurs de stress ou d'anxiété et trouvez des moyens sains de les gérer.",
        "Faites de l'exercice régulièrement pour libérer des endorphines et améliorer votre humeur.",
        "Trouvez des activités qui vous apportent de la joie et du plaisir, même dans les moments difficiles.",
        // Ajoutez d'autres conseils pour l'équilibre émotionnel
      ],
};

// Fonction pour insérer les conseils dans la base de données
const remplirBaseDeDonnees = async () => {
  try {
    // Parcourir chaque catégorie et insérer les conseils dans la base de données
    for (const [categorie, conseils] of Object.entries(conseilsParCategorie)) {
      // Créer un document pour chaque conseil et l'insérer dans la base de données
      await Conseil.insertMany(
        conseils.map((conseil) => ({ conseil, categorie }))
      );
    }
    console.log("Base de données remplie avec succès !");
  } catch (error) {
    console.error("Erreur lors du remplissage de la base de données :", error);
  } finally {
    mongoose.disconnect(); // Déconnexion de la base de données après l'insertion
  }
};

// Appel de la fonction pour remplir la base de données
remplirBaseDeDonnees();
