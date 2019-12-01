const Sequelize = require("sequelize");

const dbConfig = require("../config/database");

const User = require("../models/Usuario");
const Address = require("../models/Endereco");
const Category = require("../models/Categoria");
const Product = require("../models/Produto");
const Order = require("../models/Pedido");
const Announcement = require("../models/Anuncio");
const Question = require("../models/Pergunta");
const Answer = require("../models/Resposta");

const connection = new Sequelize(dbConfig);

User.init(connection);
Address.init(connection);
Category.init(connection);
Product.init(connection);
Order.init(connection);
Announcement.init(connection);
Question.init(connection);
Answer.init(connection);

User.associate(connection.models);
Address.associate(connection.models);
Order.associate(connection.models);
Product.associate(connection.models);
Category.associate(connection.models);
Announcement.associate(connection.models);
Question.associate(connection.models);
Answer.associate(connection.models);

module.exports = connection;
