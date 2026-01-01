"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controller/userController.js");

var _validate = _interopRequireDefault(require("../middleware/validate.js"));

var _authMiddleware = require("../middleware/authMiddleware.js");

var _userValidation = require("../validation/userValidation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/user", _authMiddleware.protect, _userController.getUsers);
router.get("/profile", _authMiddleware.protect, _userController.getProfile);
router.post("/", (0, _validate["default"])(_userValidation.createUserSchema), _userController.createUser);
router.put("/:id", (0, _validate["default"])(_userValidation.updateUserSchema), _userController.updateUser);
router["delete"]("/:id", _userController.deleteUser);
router.get("/:id", _authMiddleware.protect, _userController.getuserbyid);
var _default = router;
exports["default"] = _default;