const { Model, DataTypes } = require("sequelize");

class Categoria extends Model {
  static init(sequelize) {
    super.init(
      {
        nome_categoria: DataTypes.STRING
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Produto, {
      foreignKey: "categoria_id",
      through: "produto_categorias",
      as: "produtos"
    });
  }
}

module.exports = Categoria;
