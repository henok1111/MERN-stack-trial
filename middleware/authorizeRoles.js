export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // roles = ["admin", "moderator", "manager"]

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient permissions"
      });
    }

    next();
  };
};