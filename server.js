const express = require("express");
let mongoose = require("mongoose");


const app = express();

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGO_ATLAS || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => console.log("connected to db"))

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.listen(3000, () => {
  console.log(`App running on http://localhost:${PORT} !`);
});