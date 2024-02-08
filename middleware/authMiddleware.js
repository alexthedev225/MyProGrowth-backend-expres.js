const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
       next();
   } catch(error) {
       // Gestion des erreurs de vérification du token
       console.error(error.message);
       return res.status(401).json({ message: 'Accès non autorisé. Token invalide.' });
   }
};
