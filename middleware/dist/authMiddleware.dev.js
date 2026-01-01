"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var protect = function protect(req, res, next) {
  var authHeader, token, decoded;
  return regeneratorRuntime.async(function protect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // 1. Get Authorization header
          authHeader = req.headers.authorization; // 2. Check if header exists and starts with "Bearer"

          if (!(!authHeader || !authHeader.startsWith("Bearer "))) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            success: false,
            message: "Access denied. No token provided"
          }));

        case 4:
          // 3. Extract token from "Bearer TOKEN"
          token = authHeader.split(" ")[1]; // 4. Verify token

          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET); // 5. Attach user ID to request

          req.user = decoded; // 6. Continue to next middleware/controller

          next();
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(401).json({
            success: false,
            message: "Invalid or expired token"
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.protect = protect;