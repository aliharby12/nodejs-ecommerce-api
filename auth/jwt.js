const jwt = require('jsonwebtoken');

// Secret key for signing tokens
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-secret-key';

// Generate a JWT token
exports.generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// Generate refresh token (long-lived)
exports.generateRefreshToken = (payload, expiresIn = '7d') => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn }); // Uses separate secret
};

// Verify a JWT token
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};