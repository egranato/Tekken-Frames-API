const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const sessionQueries = require("../data/queries/session");

router.get("/", async (req, res, next) => {
  const userId = res.locals.user.id;

  try {
    const activeSessions = await sessionQueries.findActive(userId);
    return res.send(activeSessions);
  } catch (e) {
    console.log(e);
    return res.send(
      createError.InternalServerError("Could not retrieve user sessions")
    );
  }
});

router.delete("/", async (req, res, next) => {
  const sessionId = res.locals.user.session;

  try {
    await sessionQueries.invalidate(sessionId);
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(204).send();
  } catch (e) {
    console.log(e);
    return res.send(
      createError.InternalServerError("Could not remove user session")
    );
  }
});

router.delete("/:id", async (req, res, next) => {
  const sessionId = req.params.id;

  try {
    await sessionQueries.invalidate(sessionId);
    if (sessionId === req.locals.user.session) {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
    }
    res.status(204).send();
  } catch (e) {
    console.log(e);
    return res.send(
      createError.InternalServerError("Could not remove user session")
    );
  }
});

module.exports = router;
