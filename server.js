const express = require("express");
let mongoose = require("mongoose");
// const mongojs = require("mongojs");

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGO_ATLAS || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => console.log("connected to db"))

// const databaseUrl = "fitness_tracker";
// const collections = ["Workout"];

// const db = mongojs(databaseUrl, collections);

// db.on("error", error => {
//   console.log("Database Error:", error);
// });

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.listen(3000, () => {
  console.log(`App running on http://localhost:${PORT} !`);
});