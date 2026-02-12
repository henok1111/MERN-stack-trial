"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = require("../controllers/authController.js");

var _protect = require("../middleware/protect.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/register", _authController.register);
router.post("/login", _authController.login);
router.post("/refresh", _authController.refresh);
router.post("/logout", _authController.logout);
/* protected test route */

router.get("/me", _protect.protect, function (req, res) {
  res.json({
    success: true,
    user: req.user
  });
});
var _default = router;
exports["default"] = _default;