const jwt = require('jsonwebtoken');

// Middleware function to verify and decode JWT token
function authenticateToken(req, res, next) {
  // Retrieve token from request headers, query parameters, or cookies
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token not provided' });
  }

  // Verify and decode token
  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    req.user = decoded; // Add decoded user information to the request object
    next(); // Call the next middleware function
  });
}

module.exports = authenticateToken;
