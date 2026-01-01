"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authconstroller = require("../controller/authconstroller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var registerRouter = _express["default"].Router();

registerRouter.post("/register", _authconstroller.register);
registerRouter.post("/login", _authconstroller.login);
var _default = registerRouter;
exports["default"] = _default;