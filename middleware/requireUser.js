const createHttpError = require("http-errors");

const requireUser = (req, res, next) => {
  const { user } = res.locals;

  if (!user) {
    return next(createHttpError.Forbidden("No user session"));
  }

  return next();
};

module.exports = requireUser;
