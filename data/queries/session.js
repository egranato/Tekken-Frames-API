const db = require("../database-connection");

module.exports = {
  create: (userId, userAgent) => {
    return db("session").insert({ userId, userAgent }).returning("*");
  },
  find: (id) => {
    return db("session").where("id", id).first();
  },
  findActive: (userId) => {
    return db("session").where({ userId, valid: true });
  },
  invalidate: (id) => {
    return db("session").where("id", id).update({ valid: false });
  },
};
