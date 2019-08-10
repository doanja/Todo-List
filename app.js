const express = require("express");
const path = require("path"); // for file paths
const exphbs = require("express-handlebars"); // page template
const mongoose = require("mongoose"); // mongoDB
const db = require("./config/keys").MongoURI; // database config
const app = express();

const PORT = process.env.PORT || 5000;

// connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// handlebars (page template) middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// body parser middleware
app.use(express.json()); // handles json data for post requests
app.use(express.urlencoded({ extended: false })); // handles url encoded data

// homepage route (template)
// app.get("/", (req, res) =>
// res.render("list", {
//   title: "To-Do-List App"
// }));

// sets public as the static folder
app.use(express.static(path.join(__dirname, "public"))); // __dirname = current directory

// router to the API
app.use("/api/list", require("./routes/api/list"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
