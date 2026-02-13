"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _db = _interopRequireDefault(require("./config/db.js"));

var _userRouter = _interopRequireDefault(require("./routes/userRouter.js"));

var _markRouter = _interopRequireDefault(require("./routes/markRouter.js"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _authroute = _interopRequireDefault(require("./routes/authroute.js"));

require("dotenv/config");

var _status = _interopRequireDefault(require("./routes/status.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

_dotenv["default"].config(); // Middleware


app.use((0, _cors["default"])());
app.use(_express["default"].json()); // Database connection

(0, _db["default"])(); // Routes

app.use('/api/users', _userRouter["default"]);
app.use('/api', _markRouter["default"]);
app.use("/api/auth", _authroute["default"]);
app.use('/api', _status["default"]); // Start server

app.listen(5000, function () {
  console.log("Server running on port 5000");
});
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("REFRESH_SECRET:", process.env.REFRESH_SECRET);