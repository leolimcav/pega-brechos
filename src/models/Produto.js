const pool = require("../config/database");

class Produto {
  static async create(data, usuario_id) {
    const client = await pool.connect();
    const { titulo, descricao, valor, categoria, tamanho, estado } = data;
    const {
      rows: produto
    } = await client.query(
      "INSERT INTO produto (titulo, descricao, valor, categoria, tamanho, estado, usuario_id) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [titulo, descricao, valor, categoria, tamanho, estado, usuario_id]
    );
    await client.release();
    return produto;
  }

  static async findAll(usuario_id) {
    const client = await pool.connect();
    const {
      rows: produtos
    } = await client.query("SELECT * FROM produto p WHERE p.usuario_id = $1", [
      usuario_id
    ]);
    await client.release();
    return produtos;
  }

  static async findById(produtoId) {
    const client = await pool.connect();
    const {
      rows: produto
    } = await client.query("SELECT * FROM produto WHERE produto_id = $1", [
      produtoId
    ]);
    await client.release();
    return produto;
  }

  static async findByName(titulo) {
    try {
      const client = await pool.connect();
      const {
        rows: produto
      } = await client.query(
        "SELECT * FROM produto p WHERE LOWER(p.titulo) LIKE LOWER($1) AND UPPER(p.status) LIKE UPPER('ATIVO')",
        [`%${titulo}%`]
      );

      return produto;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  static async findByIdAndUpdate(produtoId, data) {
    const client = await pool.connect();
    const {
      rows: produto
    } = await client.query("SELECT * FROM produto WHERE produto_id = $1", [
      produtoId
    ]);
    if (produto) {
      const { titulo, descricao, valor, categoria, tamanho, estado } = data;
      const {
        rows: produtoNovo
      } = await client.query(
        "UPDATE produto SET titulo = $1, descricao = $2, valor = $3, categoria = $4, tamanho = $5, estado = $6 RETURNING *",
        [titulo, descricao, valor, categoria, tamanho, estado]
      );
      await client.release();
      return produtoNovo;
    }
    await client.release();
    return produto;
  }

  static async findByIdAndDelete(produtoId) {
    const client = await pool.connect();
    const {
      rows: produto
    } = await client.query("SELECT * FROM produto WHERE produto_id = $1", [
      produtoId
    ]);
    if (produto) {
      await client.query("DELETE from produto WHERE produto_id = $1", [
        produtoId
      ]);
      await client.release();
      return produto;
    }
    await client.release();
    return produto;
  }
}

module.exports = Produto;
