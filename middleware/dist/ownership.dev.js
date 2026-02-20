"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ownership = void 0;

var ownership = function ownership(Model) {
  var ownerField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "user";
  return function _callee(req, res, next) {
    var resourceId, resource;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            resourceId = req.params.id;
            _context.next = 4;
            return regeneratorRuntime.awrap(Model.findById(resourceId));

          case 4:
            resource = _context.sent;

            if (resource) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              success: false,
              message: "Resource not found"
            }));

          case 7:
            if (!(req.user.role === "admin")) {
              _context.next = 10;
              break;
            }

            req.resource = resource;
            return _context.abrupt("return", next());

          case 10:
            if (!(resource[ownerField].toString() !== req.user.id)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              success: false,
              message: "Access denied: Not your resource"
            }));

          case 12:
            // Attach resource for controller
            req.resource = resource;
            next();
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              success: false,
              message: "Ownership check failed",
              error: _context.t0.message
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 16]]);
  };
};

exports.ownership = ownership;