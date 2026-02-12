"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var protect = function protect(req, res, next) {
  try {
    var authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token"
      });
    }

    var token = authHeader.split(" ")[1];

    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, role }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

exports.protect = protect;