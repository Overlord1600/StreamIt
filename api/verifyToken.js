const JWT = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']; 
  if (authHeader) {
    const token = authHeader.split(' ')[1]; 
    
    const secretKey = process.env.KEY; 

    JWT.verify(token, secretKey, (err, hiddenData) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      } else {
        req.user = hiddenData;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "You're not authenticated" });
  }
}

module.exports = verifyToken;
