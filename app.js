const express = require('express');
const path = require('path'); // for file paths
const mongoose = require('mongoose'); // mongoDB
const key = require('./config/keys'); // database config
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();

const PORT = process.env.PORT || 5000;

// connect to database
mongoose
  .connect(key.MongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

// body parser middleware
app.use(express.json()); // handles json data for post requests
app.use(express.urlencoded({ extended: false })); // handles url encoded data

// set up view engine
app.set('view engine', 'ejs');

// encrypts cookies that last for 1 day, sends it to the browser when user logs in
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // day in miliseconds
    keys: [key.session.cookieKey] // encrypts cookie when sent to the browser
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// home route
app.use('/', require('./routes/index'));

// auth route
app.use('/auth', require('./routes/auth'));

// router to the API
app.use('/list', require('./routes/list'));

// sets public as the static folder
app.use(express.static('./public'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
