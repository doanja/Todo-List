const express = require("express");
const mongoose = require("mongoose");
const Todo = require("../../models/todo");
const router = express.Router();

// router.get('/dashboard', (req, res) => res.render('dashboard'));

// Route: Get All List Items
router.get("/dashboard", (req, res) => {

  // finds all todo items from the collection
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

// Route: get todo items with the ID
router.get("/dashboard:id", (req, res) => {
  const id = req.params.id;

  // find a todo item given the _id
  Todo.findById(id)
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

// Route: creates a todo item
router.post("/dashboard", (req, res) => {
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
router.put("/dashboard", (req, res) => {
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
router.delete("/dashboard", (req, res) => {
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
