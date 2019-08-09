const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const db = require("./config/keys").MongoURI; // db config
const expressLayouts = require('express-ejs-layouts');
const app = express();

const PORT = process.env.PORT || 5000;

// connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// EJS middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');

// bodyparser middleware
app.use(express.json()); // handles json data for post requests
app.use(express.urlencoded({ extended: false })); // handles url encoded data

// sets public as the static folder (?)
app.use(express.static(path.join('/routes', "public")));

// router to the API
// app.use("/api/routes", require("./routes/api/routes")); // route to the to do list
app.use('/', require('./routes/api/index'));
app.use('/users', require('./routes/api/users'));
app.use('/routes', require('./routes/api/routes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
