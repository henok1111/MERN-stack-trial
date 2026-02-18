"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authMiddleware = require("../middleware/authMiddleware.js");

var _ownership = require("../middleware/ownership.js");

var _postController = require("../controller/postController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var postRoute = _express["default"].Router();

postRoute.post("/", _authMiddleware.protect, // authentication
_postController.createPost // business logic
);
postRoute.get("/:id", _authMiddleware.protect, _postController.getPostById);
var _default = postRoute;
exports["default"] = _default;