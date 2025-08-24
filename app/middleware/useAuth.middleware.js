const jwt = require('jsonwebtoken');
const { default: HttpStatus } = require('http-status');
const { ROLES_TYPES } = require('../shared/constants/role');
const { Role } = require('../models/index')
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
const adminOnly = () => {
  return async (req, res, next) => {
    try {
      const role = await Role.findById(req.user?.role);
      if (role?.type !== ROLES_TYPES.ADMIN) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'You do not have permission to access this resource' });
      }

      next();
    } catch (error) {
      console.error('Error checking admin role:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
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
