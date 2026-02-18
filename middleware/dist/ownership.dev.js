"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ownership = void 0;

var ownership = function ownership() {
  var paramName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "id";
  return function (req, res, next) {
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

exports.ownership = ownership;