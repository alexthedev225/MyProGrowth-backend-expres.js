// backend/server.js

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

const allowedOrigins = ['http://localhost:5173', "https://myprogrowth.vercel.app"];
// Configuration des options CORS
app.use(cors({ origin: function(origin, callback) {
  // Vérifier si l'origine est autorisée
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
},credentials: true}));


// Connexion à la base de données
connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
const fitnessRoutes = require("./routes/fitnessRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const lifestyleRoutes = require("./routes/lifestyleRoutes");
const emotionalWellnessRoutes = require("./routes/emotionalWellnessRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const conseilRoutes = require('./routes/conseilRoutes');

app.use("/api/users", authRoutes, userRoutes);
app.use("/api/fitness", fitnessRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/lifestyle", lifestyleRoutes);
app.use("/api/emotional-wellness", emotionalWellnessRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use('/api', conseilRoutes);

app.get("/ping", (req, res) => {
  res.status(200).send("Pong!");
  console.log("Pong!");
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
