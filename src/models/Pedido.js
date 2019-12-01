const { Model, DataTypes } = require("sequelize");

class Order extends Model {
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
    this.belongsToMany(models.Product, {
      foreignKey: "pedido_id",
      through: "order_products",
      as: "ped_produto"
    });

    this.belongsTo(models.User, {
      foreignKey: "usuario_id",
      as: "pedido_usuario"
    });
  }
}

module.exports = Order;
