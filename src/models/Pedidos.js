const { Model, DataTypes } = require("sequelize");

class Pedido extends Model {
  static init(sequelize) {
    super.init(
      {
        total: DataTypes.REAL,
        data_pedido: DataTypes.DATEONLY
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Produto, {
      foreignKey: "pedido_id",
      through: "pedido_produtos",
      as: "pedido_produto"
    });

    this.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "pedido_usuario"
    });
  }
}

module.exports = Pedido;
