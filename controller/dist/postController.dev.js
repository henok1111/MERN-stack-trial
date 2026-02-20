"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePost = exports.updatePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;

var _post = _interopRequireDefault(require("../models/post.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* CREATE */
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
            user: req.user.id // 🔑 ownership binding

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
/* READ ALL (only own data) */


exports.createPost = createPost;

var getPosts = function getPosts(req, res) {
  var posts;
  return regeneratorRuntime.async(function getPosts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_post["default"].find({
            user: req.user.id
          }));

        case 3:
          posts = _context2.sent;
          res.json({
            success: true,
            posts: posts
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};
/* READ ONE */


exports.getPosts = getPosts;

var getPostById = function getPostById(req, res) {
  return regeneratorRuntime.async(function getPostById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            res.json({
              success: true,
              post: req.resource
            });
          } catch (error) {
            res.status(500).json({
              success: false,
              message: error.message
            });
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};
/* UPDATE */


exports.getPostById = getPostById;

var updatePost = function updatePost(req, res) {
  var post;
  return regeneratorRuntime.async(function updatePost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          post = req.resource;
          post.title = req.body.title || post.title;
          post.content = req.body.content || post.content;
          _context4.next = 6;
          return regeneratorRuntime.awrap(post.save());

        case 6:
          res.json({
            success: true,
            post: post
          });
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            success: false,
            message: _context4.t0.message
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};
/* DELETE */


exports.updatePost = updatePost;

var deletePost = function deletePost(req, res) {
  return regeneratorRuntime.async(function deletePost$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(req.resource.deleteOne());

        case 3:
          res.json({
            success: true,
            message: "Post deleted successfully"
          });
          _context5.next = 9;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            success: false,
            message: _context5.t0.message
          });

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.deletePost = deletePost;