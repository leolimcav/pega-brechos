const Pedido = require("../models/Pedido");
const Produto = require("../models/Produto");

module.exports = {
  async index(req, res) {
    const { order_id } = req.params;
    try {
      const pedido = await Pedido.findByPk(order_id, {
        include: {
          association: "products",
          through: {
            attributes: []
          }
        }
      });

      const { products } = await pedido.toJSON();
      let total = products.map(item => {
        return item.valor;
      });

      total = total.reduce((acc, index) => acc + index);

      pedido.update({ total });

      return res.json(pedido);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },
  async store(req, res) {
    try {
      const { order_id, product_id } = req.params;
      const pedido = await Pedido.findByPk(order_id);
      const produto = await Produto.findByPk(product_id);

      await pedido.addProducts(product_id);
      await produto.addOrders(order_id);

      const carrinho = await Pedido.findByPk(order_id, {
        include: {
          association: "products",
          through: {
            attributes: []
          }
        }
      });

      const { products } = await carrinho.toJSON();
      let total = products.map(item => {
        return item.valor;
      });

      total = total.reduce((acc, index) => acc + index);

      pedido.update({ total });

      return res.json(carrinho);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },
  async destroy(req, res) {
    const { order_id, product_id } = req.params;
    try {
      const pedido = await Pedido.findByPk(order_id, {
        include: {
          association: "products",
          through: {
            attributes: []
          }
        }
      });

      await pedido.removeProducts(product_id);

      const { products } = await pedido.toJSON();
      let total = products.map(item => {
        return item.valor;
      });

      total = total.reduce((acc, index) => acc + index);

      pedido.update({ total });

      return res.json(pedido);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },
  async checkout(req, res) {
    const { order_id } = req.params;
    try {
      const pedido = await Pedido.findByPk(order_id, {
        include: {
          association: "products",
          through: {
            attributes: []
          }
        }
      });
      const { products } = await pedido.toJSON();
      let total = products.map(item => {
        return item.valor;
      });

      total = total.reduce((acc, index) => acc + index);

      pedido.update({ total });

      return res.json(pedido);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  }
};
