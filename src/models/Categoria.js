const { Model, DataTypes } = require("sequelize");

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        nome_categoria: DataTypes.STRING
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Product, {
      foreignKey: "categoria_id",
      through: "product_categories",
      as: "produtos"
    });
  }
}

module.exports = Category;
