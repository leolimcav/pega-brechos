const { Router } = require('express');
const UserController = require('./controllers/UserController');

const routes = Router();

routes.post('/', UserController.store);

module.exports = routes;
