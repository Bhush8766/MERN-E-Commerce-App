// ======================================
// Role Based Authorization Middleware
// ======================================

const authorize = (...roles) => {
  return (req, res, next) => {
    // Check user exists
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    // Check user role
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. ${req.user.role} is not authorized.`,
      });
    }

    next();
  };
};

module.exports = authorize;