const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const db = require("./config/keys").MongoURI; // db config
<<<<<<< HEAD:app.js
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

=======
>>>>>>> parent of 4593347... adding pasport auth:index.js
const app = express();

const PORT = process.env.PORT || 5000;

// Passport Config
require('./config/passport')(passport);

// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

<<<<<<< HEAD:app.js
// EJS middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser middleware
app.use(express.json()); // handles json data for post requests
app.use(express.urlencoded({ extended: false })); // handles url encoded data

// Express Session middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect-flash (for displaying flash messages)
app.use(flash());

// Global variables (for our own middleware)
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  // res.locals.error = req.flash('error');
  next();
});

// sets public as the static folder (?)
// app.use(express.static(path.join(__dirname, "public")));

// Routes to the API
// app.use("/api/routes", require("./routes/api/routes")); // route to the to do list
app.use('/', require('./routes/api/index'));
app.use('/users', require('./routes/api/users'));
app.use('/dashboard', require('./routes/api/dashboard'));
=======
// body parser middleware
app.use(express.json()); // handles json data for post requests
app.use(express.urlencoded({ extended: false })); // handles url encoded data

// sets public as the static folder
app.use(express.static(path.join(__dirname, "public")));

// router to the API
app.use("/api/routes", require("./routes/api/routes"));
>>>>>>> parent of 4593347... adding pasport auth:index.js

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
