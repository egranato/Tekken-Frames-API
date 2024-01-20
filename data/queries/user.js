const db = require("../database-connection");

module.exports = {
  find: (id) => {
    return db("user").where("id", id).first();
  },
  createOrUpdateUser: (email, name) => {
    return db("user")
      .insert({
        email,
        name,
      })
      .onConflict("email")
      .merge()
      .returning("*");
  },
  updateUser: (id, data) => {
    return db("user")
      .update({ id, ...data })
      .returning("*");
  },
};
