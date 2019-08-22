const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Todo = require("../models/todo");
const User = require("../models/user");
const router = express.Router();

// Route: Get All List Items
router.get("/", (req, res) => {
  //finds all todo items from the collection

  res.render('todo');
  
  // Todo.find()
  //   .exec()
  //   .then(data => {
  //     console.log(data);
  //     res.status(200).json(data);
      
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({ error: err });
  //   });
});

// Route: get todo items with the ID
router.get("/:userId", (req, res) => {
  const id = req.params.userId;
  // req.user._id ?
  // need to somehow retrieve user ID
  
  // find a todo item given the _id
  Todo.find({userId: '5d5d8b95134900399cdb01d5'})
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

// Route: creates a todo item /* need to add code to attach user ID to todo */
router.post("/", (req, res) => {
  // creates a new Todo object in the database
  const todo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    todo: req.body.todo,
    userId: req.user._id
  });

  // saving the new todo item to the database
  todo
    .save() // stores in db
    .then(data => {
      console.log(data);
      res.status(201).json({
        msg: "POST request SUCCESS creating a todo item",
        createdTodo: data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Route: updates a single todo item
router.patch("/", (req, res) => {
  // store the request _id and todo
  const id = req.body.id;
  const todo = req.body.todo;

  // updates the todo item using the _id and todo from the request
  Todo.updateOne({ _id: id }, { todo: todo })
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

// Route: deletes a single todo item
router.delete("/", (req, res) => {
  // store the request _id
  const id = req.body.id;

  // deletes the todo item using the _id from the request
  Todo.deleteOne({ _id: id })
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

module.exports = router;
