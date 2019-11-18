const express = require("express");
const UsuarioController = require("./controllers/UsuarioController");
const PessoaFisicaController = require("./controllers/PessoaFisicaController");
const PessoaJuridicaController = require("./controllers/PessoaJuridicaController");
const ProdutoController = require("./controllers/ProdutoController");

const routes = express.Router();

routes.get('/users/:userid', UsuarioController.findById);
routes.get('/users', UsuarioController.index);
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
routes.delete("/pf/:pfid", PessoaFisicaController.destroy);

routes.get("/pj/:pjid", PessoaJuridicaController.index);
routes.post("/pj/:userid", PessoaJuridicaController.store);
routes.put("/pj/:pjid", PessoaJuridicaController.update);

routes.get("/product/:product_id", ProdutoController.index);
routes.post("/product/:user_id", ProdutoController.store);
routes.get("/product/:product_id", ProdutoController.update);
routes.get("/product/:product_id", ProdutoController.destroy);

module.exports = routes;
