const { Router } = require('express');
const UserController = require('./controllers/UserController');

const routes = Router();

routes.post('/users', UserController.store);
routes.get('/users/:userid', UserController.findById);
routes.get('/users', UserController.index);

module.exports = routes;
