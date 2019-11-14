const express = require("express");
const UsuarioController = require("./controllers/UsuarioController");
const PessoaFisicaController = require("./controllers/PessoaFisicaController");

const routes = express.Router();

// routes.get('/', UsuarioController.index);
routes.get("/", (req, res) => {
  res.render("index");
});

routes.post("/users", UsuarioController.store);
routes.get("/users/:userid", UsuarioController.findById);
routes.get("/users", UsuarioController.index);

routes.get("/pf/:pfid", PessoaFisicaController.index);
routes.post("/pf/:userid", PessoaFisicaController.store);
routes.put("/pf/:pfid", PessoaFisicaController.update);

module.exports = routes;
