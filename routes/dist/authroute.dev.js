"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authconstroller = require("../controller/authconstroller.js");

var _authMiddleware = require("../middleware/authMiddleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/register", _authconstroller.register);
router.post("/login", _authconstroller.login);
router.post("/refresh", _authconstroller.refresh);
router.post("/logout", _authconstroller.logout);
/* protected test route */

router.get("/me", _authMiddleware.protect, function (req, res) {
  res.json({
    success: true,
    user: req.user
  });
});
var _default = router;
exports["default"] = _default;