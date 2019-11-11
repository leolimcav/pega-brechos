const UserController = require("./controllers/UserController");

routes.get("/users/:userid", UserController.findById);
routes.get("/users", UserController.index);

routes.get("/", UsuarioController.index);

routes.post("/users", UsuarioController.store);
routes.get("/users/:userid", UsuarioController.findById);
routes.get("/users", UsuarioController.index);

module.exports = routes;
