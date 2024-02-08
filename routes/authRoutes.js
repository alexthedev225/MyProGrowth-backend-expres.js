// backend/routes/authRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Route d'inscription (Création de compte)
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Ce nom d'utilisateur est déjà pris." });
    }

    // Hache le mot de passe avant de le stocker
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Crée un nouvel utilisateur
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Sauvegarde l'utilisateur dans la base de données
    await newUser.save();

    return res.json({ message: "Inscription réussie." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Une erreur s'est produite lors de l'inscription." });
  }
});

// Route d'authentification (Connexion)
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifie si l'utilisateur existe dans la base de données
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
    }

    // Vérifie si le mot de passe correspond
    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
    }

    // Génère un JWT avec les informations de l'utilisateur
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    // Retourne le token JWT et l'ID de l'utilisateur
    return res.json({ token, userId: user._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors de l'authentification.",
    });
  }
});

// Route de déconnexion
router.post("/logout", (req, res) => {
  // Supprimer le token d'authentification stocké côté client (s'il existe)
  res.clearCookie("token");
  res.clearCookie("userId");
  res.json({ message: "Déconnexion réussie." });
});

module.exports = router;
