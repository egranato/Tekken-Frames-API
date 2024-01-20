const jwt = require("../libs/jwt");

const deserializeUser = async (req, res, next) => {
  const accessToken = (req.get("Authorization") || "").replace(/^Bearer\s/, "");
  const refreshToken = req.get("x-refresh");

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = jwt.verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await jwt.reIssueAccesstoken(refreshToken);

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      res.setHeader("access-control-expose-headers", "x-access-token");

      const result = jwt.verifyJwt(newAccessToken);

      res.locals.user = result.decoded;
    }
  }
  return next();
};

module.exports = deserializeUser;
