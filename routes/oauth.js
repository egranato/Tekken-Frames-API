const express = require("express");
const router = express.Router();
const createHttpError = require("http-errors");
const qs = require("querystring");
const jwt = require("../libs/jwt");
const google = require("../libs/google");
const userQueries = require("../data/queries/user");
const sessionQueries = require("../data/queries/session");

router.get("/google", async (req, res, next) => {
  const code = req.query.code;

  google
    .getOAuthTokens(code)
    .then(
      (oauthTokens) => {
        const user = google.decodeUser(oauthTokens.id_token);
        if (!user.email_verified) {
          return next(
            createHttpError.Forbidden("Google account is not verified")
          );
        }
        return userQueries.createOrUpdateUser(user.email, user.name);
      },
      (e) => {
        console.log(e);
        const error = createHttpError.InternalServerError(e);
        return next(error);
      }
    )
    .then(
      ([laUser]) => {
        return Promise.all([
          laUser,
          sessionQueries.create(laUser.id, req.get("user-agent") || ""),
        ]);
      },
      (e) => {
        console.log(e);
        const error = createHttpError.InternalServerError(
          new Error("Could not create user")
        );
        return next(error);
      }
    )
    .then(
      ([laUser, [session]]) => {
        const tokens = jwt.createTokens(laUser, session);

        const query = qs.stringify(tokens);

        res.redirect(`${process.env.CLIENT_URI}/workspace?${query}`);
      },
      (e) => {
        console.log(e);
        const error = createHttpError.InternalServerError(
          new Error("Could not create session")
        );
        return next(error);
      }
    );
});

module.exports = router;
