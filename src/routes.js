const express = require("express");
const UsuarioController = require("./controllers/UsuarioController");

const routes = express.Router();

routes.get("/users/:userid", UsuarioController.findById);
routes.get("/users", UsuarioController.index);

// routes.get("/", UsuarioController.index);
routes.get("/", (req, res) => {
  res.render("index");
});

routes.post("/users", UsuarioController.store);
routes.get("/users/:userid", UsuarioController.findById);
routes.get("/users", UsuarioController.index);

module.exports = routes;
