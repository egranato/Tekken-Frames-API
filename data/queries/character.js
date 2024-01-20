const db = require("../database-connection");

module.exports = {
  find: (id) => {
    return db("characer").where("id", id).first();
  },
  getAll: () => {
    return db("character").select('*');
  }
};
