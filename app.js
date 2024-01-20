require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const deserializeUser = require("./middleware/deserializeUser");
const requireUser = require("./middleware/requireUser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const oauthRouter = require("./routes/oauth");
const sessionsRouter = require("./routes/sessions");
const charactersRouter = require("./routes/characters");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// cors
const whitelist = ["http://localhost:4200"];
const corsOptions = {
  // credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

// read access tokens
app.use(deserializeUser);

// unprotected routes
app.use("/", indexRouter);
app.use("/sessions/oauth", oauthRouter);
app.use("/characters", charactersRouter);
// protected routes
app.use(requireUser);
app.use("/users", usersRouter);
app.use("/sessions", sessionsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  const errorResponse = {
    message: err.message,
    error: process.env.NODE_ENV === "development" ? err : {},
  };

  res.status(err.status || 500).send(errorResponse);
});

module.exports = app;
