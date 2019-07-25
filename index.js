const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 5000;

// body parser middleware
app.use(express.json()); // handles json data for post requests
app.use(express.urlencoded({extended: false})); // handles url encoded data

// sets public as the static folder
app.use(express.static(path.join(__dirname, "public")));

// router to the API
app.use("/api/routes", require("./routes/api/routes"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
