"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginValidation = exports.registerValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var registerValidation = function registerValidation(data) {
  var schema = _joi["default"].object({
    name: _joi["default"].string().min(3).required(),
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().min(6).required(),
    age: _joi["default"].number().min(1).required()
  });

  return schema.validate(data);
};

exports.registerValidation = registerValidation;

var loginValidation = function loginValidation(data) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().required()
  });

  return schema.validate(data);
};

exports.loginValidation = loginValidation;