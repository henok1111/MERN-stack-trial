"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPostById = exports.createPost = void 0;

var _post = _interopRequireDefault(require("../models/post.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Create post
 */
var createPost = function createPost(req, res) {
  var post;
  return regeneratorRuntime.async(function createPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_post["default"].create({
            title: req.body.title,
            content: req.body.content,
            // 🔐 ownership assignment
            userId: req.user.id
          }));

        case 3:
          post = _context.sent;
          res.status(201).json({
            success: true,
            post: post
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.createPost = createPost;

var getPostById = function getPostById(req, res) {
  var post;
  return regeneratorRuntime.async(function getPostById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_post["default"].findById(req.params.id));

        case 3:
          post = _context2.sent;

          if (post) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: "Post not found"
          }));

        case 6:
          if (!(post.userId.toString() !== req.user.id)) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(403).json({
            success: false,
            message: "Access denied: Not your post"
          }));

        case 8:
          res.json({
            success: true,
            post: post
          });
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getPostById = getPostById;