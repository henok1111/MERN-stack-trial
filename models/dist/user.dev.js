"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  age: {
    type: Number,
    required: true,
    min: 1
  },
  role: {
    type: String,
    "enum": ["user", "admin"],
    "default": "user"
  }
}, {
  timestamps: true
});

var User = _mongoose["default"].model("User", userSchema);

var _default = User;
exports["default"] = _default;