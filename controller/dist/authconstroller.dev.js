"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.refresh = exports.login = exports.register = void 0;

var _User = _interopRequireDefault(require("../models/User.js"));

var _refreshToken = _interopRequireDefault(require("../models/refreshToken.js"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* helpers */
var generateAccessToken = function generateAccessToken(user) {
  return _jsonwebtoken["default"].sign({
    id: user._id,
    role: user.role
  }, process.env.JWT_SECRET, {
    expiresIn: "15m"
  });
};

var generateRefreshToken = function generateRefreshToken(user) {
  return _jsonwebtoken["default"].sign({
    id: user._id
  }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d"
  });
};
/* REGISTER */


var register = function register(req, res) {
  var _req$body, name, age, email, password, exists, hashed, user;

  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, age = _req$body.age, email = _req$body.email, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: email
          }));

        case 4:
          exists = _context.sent;

          if (!exists) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Email exists"
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, 10));

        case 9:
          hashed = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(_User["default"].create({
            name: name,
            age: age,
            email: email,
            password: hashed
          }));

        case 12:
          user = _context.sent;
          res.status(201).json({
            success: true,
            user: user
          });
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};
/* LOGIN */


exports.register = register;

var login = function login(req, res) {
  var _req$body2, email, password, user, match, accessToken, refreshToken;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Invalid credentials"
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, user.password));

        case 9:
          match = _context2.sent;

          if (match) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Invalid credentials"
          }));

        case 12:
          accessToken = generateAccessToken(user);
          refreshToken = generateRefreshToken(user);
          _context2.next = 16;
          return regeneratorRuntime.awrap(_refreshToken["default"].create({
            user: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          }));

        case 16:
          res.json({
            success: true,
            accessToken: accessToken,
            refreshToken: refreshToken
          });
          _context2.next = 22;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 19]]);
};
/* REFRESH */


exports.login = login;

var refresh = function refresh(req, res) {
  var refreshToken, stored, decoded, user, newAccessToken;
  return regeneratorRuntime.async(function refresh$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          refreshToken = req.body.refreshToken;

          if (refreshToken) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(401).json({
            message: "No refresh token"
          }));

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(_refreshToken["default"].findOne({
            token: refreshToken
          }));

        case 6:
          stored = _context3.sent;

          if (stored) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(403).json({
            message: "Invalid refresh token"
          }));

        case 9:
          decoded = _jsonwebtoken["default"].verify(refreshToken, process.env.JWT_REFRESH_SECRET);
          _context3.next = 12;
          return regeneratorRuntime.awrap(_User["default"].findById(decoded.id));

        case 12:
          user = _context3.sent;
          newAccessToken = generateAccessToken(user);
          res.json({
            accessToken: newAccessToken
          });
          _context3.next = 20;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          res.status(403).json({
            message: "Refresh failed"
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 17]]);
};
/* LOGOUT */


exports.refresh = refresh;

var logout = function logout(req, res) {
  var refreshToken;
  return regeneratorRuntime.async(function logout$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          refreshToken = req.body.refreshToken;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_refreshToken["default"].deleteOne({
            token: refreshToken
          }));

        case 4:
          res.json({
            success: true,
            message: "Logged out"
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            success: false,
            message: _context4.t0.message
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.logout = logout;