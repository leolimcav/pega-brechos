const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        descricao: DataTypes.TEXT,
        marca: DataTypes.STRING(50),
        cor: DataTypes.STRING(30),
        valor: DataTypes.REAL,
        tamanho: DataTypes.STRING,
        estado: DataTypes.STRING(10),
        imagem: DataTypes.STRING
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Order, {
      foreignKey: "produto_id",
      through: "order_products",
      as: "orders"
    });

    this.belongsToMany(models.Category, {
      foreignKey: "produto_id",
      through: "product_categories",
      as: "categories"
    });

    this.belongsTo(models.User, {
      foreignKey: "usuario_id",
      as: "produto_usuario"
    });

    this.hasOne(models.Announcement, {
      foreignKey: "produto_id",
      as: "produto_anuncio"
    });
  }
}

module.exports = Product;
