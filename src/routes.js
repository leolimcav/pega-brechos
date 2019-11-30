const express = require("express");
const UsuarioController = require("./controllers/UsuarioController");
const EnderecoController = require("./controllers/EnderecoController");
const ProdutoController = require("./controllers/ProdutoController");
const PedidoController = require("./controllers/PedidoController");
const CarrinhoController = require("./controllers/CarrinhoController");
const SearchController = require("./controllers/SearchController");
const AnuncioController = require("./controllers/AnuncioController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

// Rotas do FRONTEND
routes.get("/", (req, res) => {
  res.render("index");
});
routes.get("/product", (req, res) => {
  res.render("product");
});
routes.get("/cart", (req, res) => {
  res.render("cart");
});
routes.get("/payment", (req, res) => {
  res.render("payment");
});
routes.get("/pegue", (req, res) => {
  res.render("pegue");
});
routes.get("/login", (req, res) => {
  res.render("login");
});

routes.get("/search", (req, res) => {
  res.render("search");
});
routes.get("/address", (req, res) => {
  res.render("address");
});
routes.get("/addAddress", (req, res) => {
  res.render("addAddress");
});
routes.get("/editAddress", (req, res) => {
  res.render("editAddress");
});
routes.get("/myOrders", (req, res) => {
  res.render("myOrders");
});

routes.get("/signup", (req, res) => {
  res.render("signup");
});
routes.get("/editUser", (req, res) => {
  res.render("editUser");
});
routes.get("/profile", (req, res) => {
  res.render("profile");
});
routes.get("/myprofile", (req, res) => {
  res.render("myprofile");
});
routes.get("/sold", (req, res) => {
  res.render(`sold`);
});

routes.get("/createad", (req, res) => {
  res.render(`createad`);
});

routes.get("/editad", (req, res) => {
  res.render(`editad`);
});
routes.get("/myquestions", (req, res) => {
  res.render(`myquestions`);
});
// ----- Rotas do Backend -----

// Rotas de Usuario
routes.get("/users/:user_id", UsuarioController.index);
routes.post("/users", UsuarioController.store);
routes.put("/users/:user_id", UsuarioController.update);
routes.delete("/users/:user_id", UsuarioController.destroy);

// Rotas de Endereço
routes.get("/address/users/:user_id", EnderecoController.index);
routes.get("/address/:address_id/users/:user_id", EnderecoController.findOne);
routes.post("/address/users/:user_id", EnderecoController.store);
routes.put("/address/:address_id/users/:user_id", EnderecoController.update);
routes.delete(
  "/address/:address_id/users/:user_id",
  EnderecoController.destroy
);

// Rotas de Produto
routes.get("/products/:product_id", ProdutoController.index);
routes.get("/products/users/:user_id", ProdutoController.findAll);
routes.post("/products/:user_id", ProdutoController.store);
routes.put("/products/:product_id", ProdutoController.update);
routes.delete("/products/:product_id", ProdutoController.destroy);

// Rotas de Pedido
routes.get("/orders/:order_id/:user_id", PedidoController.index);
routes.post("/orders/:user_id", PedidoController.store);

// Rotas do Carrinho
routes.get("/cart/:user_id/:order_id", CarrinhoController.index);
routes.post("/cart/:order_id/:product_id", CarrinhoController.store);
routes.delete("/cart/:order_id/:product_id", CarrinhoController.destroy);

// Rotas de Busca
routes.get("/search/users", SearchController.findUser);
routes.get("/search/products", SearchController.findProduct);

// Rotas de Anuncio
routes.get("/announcements/users/:user_id", AnuncioController.index);
routes.get(
  "/announcements/:poster_id/users/:user_id",
  AnuncioController.findOne
);
routes.post(
  "/announcements/products/:product_id/users/:user_id",
  AnuncioController.store
);
routes.put("/announcements/:poster_id/users", AnuncioController.update);

// Rotas de Sessão
routes.post("/session", SessionController.store);
module.exports = routes;
