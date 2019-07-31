const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const database = require("../../Database");
const mongoose = require("mongoose");
const Todo = require("../../models/todo");

// Route: Get All List Items
router.get("/", (req, res) => {
  Todo.find()
    .exec()
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Route: Get list items with ownerID that matches user's ID
router.get("/:todo", (req, res) => {
  const id = req.param.todo;

  Todo.findById(id)
    .exec()
    .then(data => {
      console.log(data);
      // if id is valid, but no entry is found
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ msg: "no valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Route: creates a todo item
router.post("/", (req, res) => {
  // creates a new Todo object in the database
  const todo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    todo: req.body.todo
  });

  // saving the new todo item to the database
  todo
    .save() // stores in db
    .then(data => {
      console.log(data);
      // when post is successful
      res.status(201).json({
        msg: "POST request SUCCESS creating a todo",
        createdTodo: data
      });
    })
    .catch(err => {
      console.log(err);
      // when post fails
      res.status(500).json({
        error: err
      });
    });
});

// Route: Update Single List Item
router.put("/", (req, res) => {
  // returns true or false if the ID is found in the database
  const target = database.some(item => item.id === req.body.id);

  // if an ID exists in the database
  if (target) {
    const updItem = req.body; // reference to the request's body

    /* when using a real database, this will be different */
    database.forEach(item => {
      // search the database
      if (item.id === req.body.id) {
        // if the ID matches one in the database, update the fields:
        // item.ownerID = updItem.ownerID ? updItem.ownerID : item.ownerID;
        // item.age = updItem.age ? updItem.age : item.age;
        item.todo = updItem.todo ? updItem.todo : item.todo;
        // item.name = updItem.name ? updItem.name : item.name;

        res.json({ msg: "Item is updated", item });
      }
    });
  } else {
    // status 404 = bad request
    res.status(404).json({ msg: `No item with the id of ${req.body.id}` });
  }
});

router.delete("/", (req, res) => {
  const id = req.body.id;
  Todo.deleteOne({ _id: id })
    .exec()
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

module.exports = router;
