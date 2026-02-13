"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.refresh = exports.login = exports.register = void 0;

var _User = _interopRequireDefault(require("../models/User.js"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _authvalidation = require("../validation/authvalidation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* =========================
   REGISTER
========================= */
var register = function register(req, res) {
  var _registerValidation, error, _req$body, name, email, password, age, emailExists, hashedPassword, user;

  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // 1. Validate request body
          _registerValidation = (0, _authvalidation.registerValidation)(req.body), error = _registerValidation.error;

          if (!error) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: error.details[0].message
          }));

        case 4:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, age = _req$body.age; // 2. Check if email already exists

          _context.next = 7;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: email
          }));

        case 7:
          emailExists = _context.sent;

          if (!emailExists) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Email already exists"
          }));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, 10));

        case 12:
          hashedPassword = _context.sent;
          _context.next = 15;
          return regeneratorRuntime.awrap(_User["default"].create({
            name: name,
            email: email,
            password: hashedPassword,
            age: age,
            role: "user" // default role

          }));

        case 15:
          user = _context.sent;
          // 5. Response
          res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: user
          });
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
};
/* =========================
   LOGIN
========================= */


exports.register = register;

var login = function login(req, res) {
  var _loginValidation, error, _req$body2, email, password, user, isMatch, accessToken, refreshToken;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // 1. Validate input
          _loginValidation = (0, _authvalidation.loginValidation)(req.body), error = _loginValidation.error;

          if (!error) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: error.details[0].message
          }));

        case 4:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // 2. Find user

          _context2.next = 7;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: email
          }).select("+password"));

        case 7:
          user = _context2.sent;

          if (user) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid email or password"
          }));

        case 10:
          console.log("Password from DB:", user.password); // 3. Compare password

          _context2.next = 13;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, user.password));

        case 13:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 16;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid email or password"
          }));

        case 16:
          // 4. Generate ACCESS TOKEN (short life)
          accessToken = _jsonwebtoken["default"].sign({
            id: user._id,
            role: user.role
          }, process.env.JWT_SECRET, {
            expiresIn: "15m"
          }); // 5. Generate REFRESH TOKEN (long life)

          refreshToken = _jsonwebtoken["default"].sign({
            id: user._id
          }, process.env.REFRESH_SECRET, {
            expiresIn: "7d"
          }); // 6. Response

          res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          });
          _context2.next = 24;
          break;

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 21]]);
};
/* =========================
   REFRESH TOKEN
========================= */


exports.login = login;

var refresh = function refresh(req, res) {
  var refreshToken, decoded, newAccessToken;
  return regeneratorRuntime.async(function refresh$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          refreshToken = req.body.refreshToken; // 1. Check token existence

          if (refreshToken) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(401).json({
            success: false,
            message: "Refresh token required"
          }));

        case 4:
          // 2. Verify refresh token
          decoded = _jsonwebtoken["default"].verify(refreshToken, process.env.REFRESH_SECRET); // 3. Generate new access token

          newAccessToken = _jsonwebtoken["default"].sign({
            id: decoded.id
          }, process.env.JWT_SECRET, {
            expiresIn: "15m"
          }); // 4. Response

          res.status(200).json({
            success: true,
            accessToken: newAccessToken
          });
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(403).json({
            success: false,
            message: "Invalid or expired refresh token"
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // LOGOUT


exports.refresh = refresh;

var logout = function logout(req, res) {
  var refreshToken, user;
  return regeneratorRuntime.async(function logout$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          refreshToken = req.body.refreshToken;

          if (refreshToken) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            success: false,
            message: "Refresh token required"
          }));

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            refreshToken: refreshToken
          }));

        case 6:
          user = _context4.sent;

          if (user) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.status(403).json({
            success: false,
            message: "Invalid refresh token"
          }));

        case 9:
          // Invalidate token
          user.refreshToken = null;
          _context4.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          res.status(200).json({
            success: true,
            message: "Logged out successfully"
          });
          _context4.next = 18;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            success: false,
            message: _context4.t0.message
          });

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.logout = logout;