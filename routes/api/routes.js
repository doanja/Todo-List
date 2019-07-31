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
  const id = req.body.id;
  const todo = req.body.todo;
  Todo.updateOne({ _id: id }, { todo: todo})
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
