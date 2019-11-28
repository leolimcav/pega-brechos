const pool = require("../config/database");

class Produto {
  static async create(data, usuario_id) {
    const client = await pool.connect();
    const { nome, descricao, valor, categoria, tamanho, estado } = data;
    const {
      rows: produto
    } = await client.query(
      "INSERT INTO produto (nome, descricao, valor, categoria, tamanho, estado, usuario_id) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [nome, descricao, valor, categoria, tamanho, estado, usuario_id]
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

  static async findByName(nome) {
    try {
      const client = await pool.connect();
      const {
        rows: produto
      } = await client.query(
        "SELECT * FROM produto p WHERE LOWER(p.nome) LIKE LOWER($1) AND UPPER(p.status) LIKE UPPER('ATIVO')",
        [`%${nome}%`]
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
      const { nome, descricao, valor, categoria, tamanho, estado } = data;
      const {
        rows: produtoNovo
      } = await client.query(
        "UPDATE produto SET nome = $1, descricao = $2, valor = $3, categoria = $4, tamanho = $5, estado = $6 RETURNING *",
        [nome, descricao, valor, categoria, tamanho, estado]
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
