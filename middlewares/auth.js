import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Token manquant" });
  }

  // Utilisation d'une clé de secours pour éviter le crash au démarrage
  const secret = process.env.JWT_SECRET || "CHANGE LE JULIEN";

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token invalide ou expiré" });
    }

    // On récupère 'sub' (le 3) et on le met dans req.user.id
    req.user = { id: decoded.sub }; 
    next();
  });
};