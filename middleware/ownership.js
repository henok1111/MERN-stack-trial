export const ownership = (Model, ownerField = "user") => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;

      const resource = await Model.findById(resourceId);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: "Resource not found"
        });
      }

      // Admin bypass
      if (req.user.role === "admin") {
        req.resource = resource;
        return next();
      }

      // Ownership check
      if (resource[ownerField].toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "Access denied: Not your resource"
        });
      }

      // Attach resource for controller
      req.resource = resource;

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Ownership check failed",
        error: error.message
      });
    }
  };
};