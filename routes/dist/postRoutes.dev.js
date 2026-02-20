"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _postController = require("../controller/postController.js");

var _authMiddleware = require("../middleware/authMiddleware.js");

var _ownership = require("../middleware/ownership.js");

var _authorizeRoles = require("../middleware/authorizeRoles.js");

var _post = _interopRequireDefault(require("../models/post.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();
/* AUTH REQUIRED */
//router.use(protect);

/* ROUTES */
// Create


router.post("/", _postController.createPost); // Read own posts

router.get("/", _postController.getPosts); // Read one (ownership enforced)

router.get("/:id", (0, _ownership.ownership)(_post["default"], "user"), _postController.getPostById); // Update (ownership enforced)

router.put("/:id", (0, _ownership.ownership)(_post["default"], "user"), _postController.updatePost); // Delete (ownership + admin override)

router["delete"]("/:id", (0, _ownership.ownership)(_post["default"], "user"), (0, _authorizeRoles.authorizeRoles)("admin"), _postController.deletePost);
var _default = router;
exports["default"] = _default;