const express = require('express');
const router = express.Router();
const characterQueries = require("../data/queries/character");

/* GET home page. */
router.get('/', async (req, res, next) => {
  const characters = await characterQueries.getAll();

  return res.json(characters);
});

module.exports = router;
