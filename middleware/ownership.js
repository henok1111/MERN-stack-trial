export const ownership = (paramName = "id") => {
  return (req, res, next) => {
    // paramName = req.params[paramName]
    // usually "id"

    if (req.params[paramName] !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied: Not your resource"
      });
    }
    next();
  };
};
