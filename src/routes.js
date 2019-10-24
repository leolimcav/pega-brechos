const { Router } = require('express');
const UsuarioController = require('./controllers/UsuarioController');

const routes = Router();

routes.post('/users', UsuarioController.store);
routes.get('/users/:userid', UsuarioController.findById);
routes.get('/users', UsuarioController.index);

module.exports = routes;
