const { Model, DataTypes } = require("sequelize");

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        descricao: DataTypes.TEXT,
        valor: DataTypes.REAL,
        tamanho: DataTypes.STRING,
        estado: DataTypes.STRING(10)
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Pedido, {
      foreignKey: "produto_id",
      through: "pedido_produtos",
      as: "produto_pedido"
    });

    this.belongsToMany(models.Categoria, {
      foreignKey: "produto_id",
      through: "produto_categorias",
      as: "categorias"
    });

    this.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "produto_usuario"
    });

    this.hasOne(models.Anuncio, {
      foreignKey: "produto_id",
      as: "produto_anuncio"
    });
  }
}

module.exports = Produto;
