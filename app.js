const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const db = require("./config/keys").MongoURI; // db config
const app = express();

const PORT = process.env.PORT || 5000;

// connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// body parser middleware
app.use(express.json()); // handles json data for post requests
app.use(express.urlencoded({ extended: false })); // handles url encoded data

// sets public as the static folder
app.use(express.static(path.join(__dirname, "public")));

// router to the API
app.use("/api/list", require("./routes/api/list"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
