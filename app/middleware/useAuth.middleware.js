const jwt = require('jsonwebtoken');
const { default: HttpStatus } = require('http-status');
const { ROLES_TYPES } = require('../shared/constants/role');
const useAuth = (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
  
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
      }

      req.user = decoded;
      next(); 
    });
  } catch (err) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Auth middleware error', error: err.message });
  }
};
const adminOnly = (role) => {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'You do not have permission to access this resource' });
    }
    next();
  };
};
const adminOrSelf = (req, res, next) => {
  const userIdFromToken = req?.user?.id;
  const userRole = req?.user?.role;
  const targetUserId = req.params.id;
  if (userRole == ROLES_TYPES.ADMIN|| userIdFromToken == targetUserId) {
    return next();
  }

  return res.status(HttpStatus.FORBIDDEN).json({ message: 'Access denied' });
};

module.exports = { useAuth, adminOnly, adminOrSelf };
