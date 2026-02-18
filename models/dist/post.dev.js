"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var postSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  // 🔗 Ownership link
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    // reference User collection
    required: true
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model("Post", postSchema);

exports["default"] = _default;