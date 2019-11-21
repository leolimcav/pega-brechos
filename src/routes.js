const express = require("express");
const UsuarioController = require("./controllers/UsuarioController");
const PessoaFisicaController = require("./controllers/PessoaFisicaController");
const PessoaJuridicaController = require("./controllers/PessoaJuridicaController");
const ProdutoController = require("./controllers/ProdutoController");
const PedidoController = require("./controllers/PedidoController");

const routes = express.Router();

routes.get("/users/:userid", UsuarioController.findById);
routes.get("/users", UsuarioController.index);
// routes.get('/', UsuarioController.index);
routes.get("/", (req, res) => {
  res.render("index");
});
routes.get("/product", (req, res) => {
  res.render("product");
});

// Rotas de Usuario
routes.post("/users", UsuarioController.store);
routes.get("/users/:userid", UsuarioController.findById);
routes.get("/users", UsuarioController.index);

// Rotas de Usuario PF
routes.get("/pf/:pfid", PessoaFisicaController.index);
routes.post("/pf/:userid", PessoaFisicaController.store);
routes.put("/pf/:pfid", PessoaFisicaController.update);
routes.delete("/pf/:pfid", PessoaFisicaController.destroy);

// Rotas de Usuario PJ
routes.get("/pj/:pjid", PessoaJuridicaController.index);
routes.post("/pj/:userid", PessoaJuridicaController.store);
routes.put("/pj/:pjid", PessoaJuridicaController.update);

// Rotas de Produto
routes.get("/products/:product_id", ProdutoController.index);
routes.post("/products/:user_id", ProdutoController.store);
routes.get("/products/:product_id", ProdutoController.update);
routes.get("/products/:product_id", ProdutoController.destroy);

// Rotas de Pedido
routes.get("/orders/:order_id/:user_id", PedidoController.index);
routes.post("/orders/:user_id", PedidoController.store);

module.exports = routes;
