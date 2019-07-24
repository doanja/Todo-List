const express = require("express");
const router = express.Router();
const database = require("../../Database");

// Route: Get All List Items
router.get("/", (req, res) => {
  res.json(database);
});

// Route: Get Single List Item
router.get("/:id", (req, res) => {
  // returns true or false if the ID is found in the database
  const found = database.some(item => item.id === req.params.id);

  // if an ID exists in the database
  if (found) {
    // return all list items that match the ID (req.param.id)
    res.json(database.filter(item => item.id === req.params.id));
  } else {
    // status 400 = bad request
    res.status(400).json({ msg: `No item with the id of ${req.params.id}` });
  }
});

// Route: Create a Single List Item
router.post("/", (req, res) => {
    res.send(req.body);
});

module.exports = router;
