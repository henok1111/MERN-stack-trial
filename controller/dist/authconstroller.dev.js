"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.register = void 0;

var _user = _interopRequireDefault(require("../models/user.js"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _authvalidation = require("../validation/authvalidation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var register = function register(req, res) {
  var _registerValidation, error, emailExists, hashedPassword, user;

  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
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
          _context.next = 6;
          return regeneratorRuntime.awrap(_user["default"].findOne({
            email: req.body.email
          }));

        case 6:
          emailExists = _context.sent;

          if (!emailExists) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Email already exists"
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(req.body.password, 10));

        case 11:
          hashedPassword = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(_user["default"].create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            age: req.body.age
          }));

        case 14:
          user = _context.sent;
          res.status(201).json({
            success: true,
            message: "User registered",
            user: user
          });
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

exports.register = register;

var login = function login(req, res) {
  var _loginValidation, error, user, validPass, token;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log(req.body);
          _loginValidation = (0, _authvalidation.loginValidation)(req.body), error = _loginValidation.error;

          if (!error) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: error.details[0].message
          }));

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(_user["default"].findOne({
            email: req.body.email
          }));

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
          _context2.next = 12;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(req.body.password, user.password));

        case 12:
          validPass = _context2.sent;

          if (validPass) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid email or password"
          }));

        case 15:
          token = _jsonwebtoken["default"].sign({
            id: user._id,
            role: user.role
          }, process.env.JWT_SECRET, {
            expiresIn: "1h"
          });
          res.json({
            success: true,
            message: "Login successful",
            token: token
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

exports.login = login;