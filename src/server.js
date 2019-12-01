const express = require("express");
const path = require("path");
const cors = require("cors");

require("./database");
const routes = require("./routes");

const app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "views")));
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3333, () => {
  console.log("Running on 3333");
});
