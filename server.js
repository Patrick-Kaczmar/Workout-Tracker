const express = require("express");
const mongojs = require("mongojs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

const databaseUrl = "fitness_tracker";
const collections = ["workout"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});

app.listen(3000, () => {
  console.log("App running on http://localhost:3000 !");
});