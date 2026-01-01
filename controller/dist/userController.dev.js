"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProfile = exports.getuserbyid = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;

var _user = _interopRequireDefault(require("../models/user.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getUsers = function getUsers(req, res, next) {
  var users;
  return regeneratorRuntime.async(function getUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_user["default"].find());

        case 3:
          users = _context.sent;
          res.json({
            success: true,
            data: users
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getUsers = getUsers;

var createUser = function createUser(req, res, next) {
  var newUser;
  return regeneratorRuntime.async(function createUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_user["default"].create(req.body));

        case 3:
          newUser = _context2.sent;
          res.status(201).json({
            success: true,
            data: newUser
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.createUser = createUser;

var updateUser = function updateUser(req, res, next) {
  var updated;
  return regeneratorRuntime.async(function updateUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_user["default"].findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          }));

        case 3:
          updated = _context3.sent;

          if (updated) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found"
          }));

        case 6:
          res.json({
            success: true,
            data: updated
          });
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.updateUser = updateUser;

var deleteUser = function deleteUser(req, res, next) {
  var deleted;
  return regeneratorRuntime.async(function deleteUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_user["default"].findByIdAndDelete(req.params.id));

        case 3:
          deleted = _context4.sent;

          if (deleted) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found"
          }));

        case 6:
          res.json({
            success: true,
            message: "User deleted successfully"
          });
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.deleteUser = deleteUser;

var getuserbyid = function getuserbyid(req, res) {
  var user;
  return regeneratorRuntime.async(function getuserbyid$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_user["default"].findById(req.params.id).select("-password"));

        case 3:
          user = _context5.sent;

          if (user) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found"
          }));

        case 6:
          // 3. Success response
          res.status(200).json({
            success: true,
            name: user.name,
            email: user.email
          });
          _context5.next = 13;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          // 4. Improved error handling
          console.error("Error fetching user:", _context5.t0);
          res.status(400).json({
            success: false,
            message: _context5.t0.message || "Invalid ID format or Server Error"
          });

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getuserbyid = getuserbyid;

var getProfile = function getProfile(req, res) {
  var user;
  return regeneratorRuntime.async(function getProfile$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_user["default"].findById(req.user.id).select("-password"));

        case 3:
          user = _context6.sent;
          res.json({
            success: true,
            user: user
          });
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            success: false,
            message: _context6.t0.message
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getProfile = getProfile;