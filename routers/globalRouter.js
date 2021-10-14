const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("screens/main");
});

router.post("/hobby/create");

module.exports = router;
