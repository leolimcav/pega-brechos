const Sequelize = require("sequelize");

const dbConfig = require("../config/database");

const Usuario = require("../models/Usuarios");
const Enderecos = require("../models/Enderecos");
const Categorias = require("../models/Categorias");
const Produtos = require("../models/Produtos");
const Pedidos = require("../models/Pedidos");
const Anuncios = require("../models/Anuncios");
const Perguntas = require("../models/Perguntas");
const Respostas = require("../models/Respostas");

const connection = new Sequelize(dbConfig);

Usuario.init(connection);
Enderecos.init(connection);
Categorias.init(connection);
Produtos.init(connection);
Pedidos.init(connection);
Anuncios.init(connection);
Perguntas.init(connection);
Respostas.init(connection);

Usuario.associate(connection.models);
Enderecos.associate(connection.models);
Pedidos.associate(connection.models);
Produtos.associate(connection.models);
Categorias.associate(connection.models);
Anuncios.associate(connection.models);
Perguntas.associate(connection.models);
Respostas.associate(connection.models);

module.exports = connection;
