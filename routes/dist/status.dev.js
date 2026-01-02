"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _status = require("../controller/status.js");

var _validate = _interopRequireDefault(require("../middleware/validate.js"));

var _statusValidation = require("../validation/statusValidation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var statusroute = _express["default"].Router();

statusroute.get('/statusdisplay', (0, _validate["default"])(_statusValidation.statusSchema), _status.statusDisplay);
statusroute.get('/insertstatus', (0, _validate["default"])(_statusValidation.statusSchema), _status.insertStatus);
var _default = statusroute;
exports["default"] = _default;